import {Server,Socket} from "socket.io";
import { handleChatEvents } from "./handlers/chatEvents.socket.handlers";
import { handleJoiningRoom,handleLeavingRoom } from "./handlers/userEvents.socket.handlers";
import type { SocketHandlerInterface } from "./handlers/types.socket.handlers";

export class SocketManager {
    private io: Server | null;
    private RegisteredSocketHandlers:SocketHandlerInterface[] = [];
    
    constructor(){
        this.io = null;
    }
    public connect(io:Server){
        if(!io){
            throw new Error('Please pass a valid Server')
        }
        this.io = io;
        this.initialize();
    }
    private initialize(){
        if(!this.io){throw new Error('no io connection')}
        const io = this.io;
        io.on("connection",(socket:Socket) => {
            console.log('connected from within class ')
            this.registerHandlers(io,socket);
            socket.on("disconnect", () => {
                console.log("User disconnected:",socket.id)
            })
        })
    }

    private registerHandlers(io:Server,socket:Socket){
        for(const socketHandler of this.RegisteredSocketHandlers){
            socketHandler(io,socket)
        }
    }

    public addRegisterHandler(socketHandler:SocketHandlerInterface){
        this.RegisteredSocketHandlers.push(socketHandler)
        return this;
    } 
}


 const socketManager = new SocketManager();
 socketManager.
 addRegisterHandler(handleChatEvents).
 addRegisterHandler(handleJoiningRoom).
 addRegisterHandler(handleLeavingRoom)
 
export  {socketManager};