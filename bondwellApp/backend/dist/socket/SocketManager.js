import { Server, Socket } from "socket.io";
import { handleChatEvents } from "./handlers/chatEvents.socket.handlers.js";
import { handleJoiningRoom, handleLeavingRoom } from "./handlers/userEvents.socket.handlers.js";
export class SocketManager {
    io;
    RegisteredSocketHandlers = [];
    constructor() {
        this.io = null;
    }
    connect(io) {
        if (!io) {
            throw new Error('Please pass a valid Server');
        }
        this.io = io;
        this.initialize();
    }
    initialize() {
        if (!this.io) {
            throw new Error('no io connection');
        }
        const io = this.io;
        io.on("connection", (socket) => {
            console.log('connected from within class ');
            this.registerHandlers(io, socket);
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }
    registerHandlers(io, socket) {
        for (const socketHandler of this.RegisteredSocketHandlers) {
            socketHandler(io, socket);
        }
    }
    addRegisterHandler(socketHandler) {
        this.RegisteredSocketHandlers.push(socketHandler);
        return this;
    }
}
const socketManager = new SocketManager();
socketManager.
    addRegisterHandler(handleChatEvents).
    addRegisterHandler(handleJoiningRoom).
    addRegisterHandler(handleLeavingRoom);
export { socketManager };
//# sourceMappingURL=SocketManager.js.map