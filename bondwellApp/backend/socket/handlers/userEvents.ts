import {Server,Socket} from 'socket.io'
const handleJoiningRoom = (socket,room_name) => {
    const Validated_Room_Name = validateRoom(room_name)
    socket.join(Validated_Room_Name);
    // ADD ROOM IN DB MAYBE
    //
}

const handleLeavingRoom = (socket:Socket, room_name) => {
    socket.leave(room_name)
}
const validateRoom = (room_name) => {
    return room_name;
}