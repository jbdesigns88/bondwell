import { ResponseItemsPage } from "openai/resources/responses/input-items.mjs";
import { Server, Socket } from "socket.io";
export enum MessageTarget {
  BROADCAST = "broadcast",
  ROOM = "room",
  INDIVIDUAL = "individual",
  SELF = "self",
}

export enum RecipientType {
  USER = "user",
  AI = "ai",
}

interface ChatPayload {
  message: string;
  from?: string;
  to?: string;
  room?: string;
  target: MessageTarget;
  recipientType: RecipientType;
}

const EVENT = "chat:message";
const handleAiMessage = (socket: Socket, payload: ChatPayload) => {};
const handleUserMessage = (socket: Socket, payload: ChatPayload) => {};

const broadcast = (socket: Socket, io: Server, payload: ChatPayload) => {
  const { message } = payload;

  socket.broadcast.emit(EVENT, { message });
};

/**
 * @param {Socket} socket - The socket instance representing the current client.
 * @param {Server} io - The Socket.IO server instance.
 * @param {ChatPayload} payload - The chat message payload containing message details.
 * @throws {Error} If the room name is not defined.
 * @returns {void}
 */
const room = (socket: Socket, io: Server, payload: ChatPayload) => {
  const { room, message } = payload;

  if (!room) {
    throw new Error("A room name must be defined");

  }
  io.to(room).emit(EVENT, { message });
};

/**
 * @param {Socket} socket - The socket instance representing the current client.
 * @param {Server} io - The Socket.IO server instance.
 * @param {ChatPayload} payload - The chat message payload containing message details.
 * @throws {Error} If the room name is not defined.
 * @returns {void}
 */

const individual = (socket: Socket, io: Server, payload: ChatPayload) => {
  const { room, recipientType } = payload;

  if (!room) {
    throw new Error("A room name must be defined");
  }

  recipientType === "ai"
    ? handleAiMessage(socket, payload)
    : handleUserMessage(socket, payload);
};

const myself = (socket: Socket, io: Server, payload: ChatPayload) => {
  const { message } = payload;

  socket.emit(EVENT, { message });
};

const SENDING_TO = {
  broadcast: broadcast,
  room: room,
  individual: individual,
  myself: myself,
};

const handleChatEvents = (io: Server, socket: Socket) => {
  socket.on(EVENT, (payload: ChatPayload) => {
    const { target } = payload;
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
