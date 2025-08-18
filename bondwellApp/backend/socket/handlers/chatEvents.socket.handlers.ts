 
import {socketManager,SocketManager} from "../SocketManager";
import { Server, Socket } from "socket.io";
import type { ChatEnvelope  } from "../type.socket";
import { MessageTarget } from "../type.socket";
 

const EVENT = "chat:message";
const handleAiMessage = (socket: Socket, payload: ChatEnvelope) => {};
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
    console.log(
      `got the chat event with the target ${target}
        data: ${JSON.stringify(payload.data,null,2)}
      `
    )
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

