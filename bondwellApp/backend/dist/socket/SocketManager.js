"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketManager = exports.SocketManager = void 0;
const chatEvents_socket_handlers_js_1 = require("./handlers/chatEvents.socket.handlers.js");
const userEvents_socket_handlers_js_1 = require("./handlers/userEvents.socket.handlers.js");
class SocketManager {
    constructor() {
        this.RegisteredSocketHandlers = [];
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
exports.SocketManager = SocketManager;
const socketManager = new SocketManager();
exports.socketManager = socketManager;
socketManager.
    addRegisterHandler(chatEvents_socket_handlers_js_1.handleChatEvents).
    addRegisterHandler(userEvents_socket_handlers_js_1.handleJoiningRoom).
    addRegisterHandler(userEvents_socket_handlers_js_1.handleLeavingRoom);
