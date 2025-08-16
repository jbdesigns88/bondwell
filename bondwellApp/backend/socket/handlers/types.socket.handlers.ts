import {Server,Socket} from 'socket.io'

export interface SocketHandlerInterface {
    (io:Server, socket:Socket): void;
}