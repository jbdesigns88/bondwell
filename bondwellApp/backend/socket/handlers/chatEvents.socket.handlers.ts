 
import {socketManager,SocketManager} from "../SocketManager";
import { Server, Socket } from "socket.io";
import type { ChatEnvelope  } from "../type.socket";
import { MessageTarget } from "../type.socket";
import { OpenAI } from "../../ai/OpenAI";
import baseKnowledge from '../../knowledge_base/intial_knowledge';
 
import { Storage } from "@google-cloud/storage";
const AI = new OpenAI();
const storage = new Storage();
const saveConversation = async (username: string, conversation: string) => {
    const bucketName = "bondwell-conversations";
    const fileName = `${username}.json`;
    const file = storage.bucket(bucketName).file(`conversations/${fileName}`);
    try {
      await file.save(JSON.stringify(conversation, null, 2), {
        contentType: 'application/json',
        metadata: {
          cacheControl: 'no-cache',
        },
      });
    } catch (error) {
      console.error("Error saving conversation:", error);
      throw new Error("Failed to save conversation");
    }
  };

const loadConversation =async (username:string) => {
  const bucketName = 'bondwell-441003.appspot.com'; 
  const file = storage.bucket(bucketName).file(`conversations/${username}.json`);
  try {
    const [exists] = await file.exists();
    if (!exists) {
      return [{ role: "system", content: "Welcome back to your private chat with Lisa Bondwell." }];
    }
    const [contents] = await file.download();
    return JSON.parse(contents.toString());
  } catch (error) {
 
    return [{ role: "system", content: "Welcome back to your private chat with Lisa Bondwell." }];
  }
  // const convoFile = path.join(createUserDirectory(username), 'conversation.json');
  // if (fs.existsSync(convoFile)) {
  //   return JSON.parse(fs.readFileSync(convoFile, 'utf8'));
  // }
  // return [{ role: "system", content: "Welcome back to your private chat with Lisa Bondwell." }];
};

const EVENT = "chat:message";

const completeEvent = "chat:complete";

const complete = (socket: Socket) => {
  console.log("Chat is complete");
  socket.emit(completeEvent, { status: "complete" });
};

const handleAiMessage = (socket: Socket, payload: ChatEnvelope) => {
  try {

   
 
      const { message, room ,to,username} = payload.data;
      let conversation:{role:string,content:string}[] = [];
      if(socket.recovered){
        // loadConversation(username!).then((convo) => {
        //   conversation = convo;
        //   console.log("loaded conversation", conversation);
        // });
        console.log("recovered session for ", username);
         conversation = [ ...baseKnowledge ];
      }
      else{
        //load conversation from storage
        conversation = [ ...baseKnowledge ];
      }

  
      AI.connect();
        
      conversation.push({ role: 'user', content: message });
      AI.addSettings({ messages: conversation });
      AI.create(message,(response : string) => {
  
        socket.emit(EVENT, {
          data:{
            message: response,
            from: "ai",
            to: to || "user",
            room: room || "default",
            target: MessageTarget.INDIVIDUAL,
            recipientType: "user",
          }
        });
        conversation.push({ role: 'assistant', content: response });
      },() => {
        complete(socket);
        // save conversation
        
      });

      // saveConversation(username!,conversation.join("")).then(() => {
      //   console.log("Conversation saved successfully.");
      // }).catch((err) => {
      //   console.error("Error saving conversation:", err);
      // });
  }
  catch (err) {
    console.error("Error handling AI message:", err);
    return;
  }

};
const handleUserMessage = (socket: Socket, payload: ChatEnvelope) => {};

const broadcast = (socket: Socket, io: Server, payload: ChatEnvelope) => {
  const { message } = payload.data;

  socket.broadcast.emit(EVENT, { message });
};

/**
 * @param {Socket} socket - The socket instance representing the current client.
 * @param {Server} io - The Socket.IO server instance.
 * @param {ChatPayload} ChatEnvelope - The chat message payload containing message details.
 * @throws {Error} If the room name is not defined.
 * @returns {void}
 */
const room = (socket: Socket, io: Server, payload: ChatEnvelope) => {
  const { room, message } = payload.data;

  if (!room) {
    throw new Error("A room name must be defined");

  }
  io.to(room).emit(EVENT, { message });
};

/**
 * @param {Socket} socket - The socket instance representing the current client.
 * @param {Server} io - The Socket.IO server instance.
 * @param {ChatPayload} ChatEnvelope - The chat message payload containing message details.
 * @throws {Error} If the room name is not defined.
 * @returns {void}
 */

const individual = (socket: Socket, io: Server, payload: ChatEnvelope) => {
  const { room, recipientType } = payload.data;

  if (!room) {
    throw new Error("A room name must be defined");
  }

  recipientType === "ai"
    ? handleAiMessage(socket, payload)
    : handleUserMessage(socket, payload);
};

const myself = (socket: Socket, io: Server, payload: ChatEnvelope) => {
  const { message } = payload.data;
  socket.emit(EVENT, { message });
};

 /* ********************************************************************************
  Storing functions into an object to be called dynamically.
 ********************************************************************************
 */

const SENDING_TO = {
  [MessageTarget.BROADCAST]: broadcast,
  [MessageTarget.ROOM]: room,
  [MessageTarget.INDIVIDUAL]: individual,
  [MessageTarget.SELF]: myself,
};

const handleChatEvents = (io: Server, socket: Socket) => {
  socket.on(EVENT, (payload: ChatEnvelope) => {
    const { target } = payload.data;
    const sendFn = SENDING_TO[target];
    if (sendFn) {
      try {
        sendFn(socket, io, payload);
      } catch (err) {
        console.log(`error `, err);
      }
    }
  });
  // const type = RECEIVER[receiver];
  // const payload: Payload = {type:'ai',data:{}}
  // SENDING_TO[sending_to](socket,io,payload);
};

export { handleChatEvents };

// export class ChatEvents{
//   private chatEvents = [];
//   private socketManager:SocketManager;
//   constructor(socketManager:SocketManager){
//     if(!SocketManager){
//       throw new Error("socket manager must be valid")
//     }

//     this.socketManager = socketManager;
//     this.registerEvents();
//   }

//   private registerEvents(){
//     for(const chatEvent of this.chatEvents){
//       this.socketManager.addRegisterHandler(chatEvent);
//     }
    
//   }
// }

