export declare enum MessageTarget {
    BROADCAST = "broadcast",
    ROOM = "room",
    INDIVIDUAL = "individual",
    SELF = "self"
}
export declare enum RecipientType {
    USER = "user",
    AI = "ai"
}
interface ChatMessageType {
    message: string;
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
interface SocketEnvelope<T = any> {
    type: string;
    data: T;
    timestamp: string;
    session_id: string;
}
export type ChatEnvelope = SocketEnvelope<ChatMessageType>;
export type UserEnvelope = SocketEnvelope<UserMessageType>;
export {};
//# sourceMappingURL=type.socket.d.ts.map