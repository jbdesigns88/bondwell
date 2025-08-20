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

interface ChatMessageType {
  message: string;
  username?: string; // for AI messages
  userId?: string; // for AI messages
  from?: string;
  to?: string;
  room?: string;
  target: MessageTarget;
  recipientType: RecipientType;
}

interface UserMessageType {
  message: string;
  from?: string;
  to?: string;
  room_name?: string;
  recipientType: RecipientType;
}


interface basePayload {
    data: ChatMessageType | UserMessageType
    timestamp:string
    session_id:string
}
 

 interface SocketEnvelope<T = any> {
  type: string;
  data: T;
  timestamp: string;
  session_id: string;
}


export type ChatEnvelope = SocketEnvelope<ChatMessageType>;
export type UserEnvelope = SocketEnvelope<UserMessageType>;
