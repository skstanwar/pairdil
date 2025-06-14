// sockets/feelingSocket.js
export const registerchatSocket = (io, socket) => {
  socket.on('send_message', ({ userId, msg }) => {
    console.log(`💬 Msg from ${userId}: ${msg}`);

    // Broadcast to the partner
    socket.broadcast.emit('receive_msg', { userId, msg });
  });
};
