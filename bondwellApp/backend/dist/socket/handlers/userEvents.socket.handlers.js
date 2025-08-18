"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLeavingRoom = exports.handleJoiningRoom = void 0;
const EVENTS = {
    ROOMS: {
        JOIN: 'user:event:joinroom',
        LEAVE: 'user:event:leave'
    }
};
const handleJoiningRoom = (io, socket) => {
    socket.on(EVENTS.ROOMS.JOIN, (payload) => {
        const { room_name } = payload;
        const Validated_Room_Name = validateRoom(room_name);
        socket.join(Validated_Room_Name);
    });
    // ADD ROOM IN DB MAYBE
    //
};
exports.handleJoiningRoom = handleJoiningRoom;
const handleLeavingRoom = (io, socket) => {
    socket.on(EVENTS.ROOMS.LEAVE, (payload) => {
        const { room_name } = payload;
        socket.leave(room_name);
    });
};
exports.handleLeavingRoom = handleLeavingRoom;
const validateRoom = (room_name) => {
    return room_name;
};
