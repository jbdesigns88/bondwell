import { Server } from "socket.io";
import type { SocketHandlerInterface } from "./handlers/types.socket.handlers.js";
export declare class SocketManager {
    private io;
    private RegisteredSocketHandlers;
    constructor();
    connect(io: Server): void;
    private initialize;
    private registerHandlers;
    addRegisterHandler(socketHandler: SocketHandlerInterface): this;
}
declare const socketManager: SocketManager;
export { socketManager };
//# sourceMappingURL=SocketManager.d.ts.map