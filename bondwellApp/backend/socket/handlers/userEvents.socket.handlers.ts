import { Server, Socket } from "socket.io";
const EVENTS = {
    ROOMS:{
        JOIN:'user:event:joinroom',
        LEAVE: 'user:event:leave'
    }
 
};
export const handleJoiningRoom = (io: Server, socket: Socket) => {
  socket.on(EVENTS.ROOMS.JOIN, (payload) => {
    const { room_name } = payload;
    const Validated_Room_Name = validateRoom(room_name);
    socket.join(Validated_Room_Name);
 
  });

  // ADD ROOM IN DB MAYBE
  //
};

export const handleLeavingRoom = (io: Server, socket: Socket) => {
    socket.on(EVENTS.ROOMS.LEAVE, (payload) => {
    const { room_name } = payload;
    socket.leave(room_name);
 
  });
};

const validateRoom = (room_name: string) => {
  return room_name;
};
