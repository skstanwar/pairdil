// sockets/feelingSocket.js
export const registerFeelingSocket = (io, socket) => {
  socket.on('send_feeling', ({ userId, feeling }) => {
    console.log(`💗 Feeling update from ${userId}: ${feeling}`);

    // Broadcast to the partner
    socket.broadcast.emit('receive_feeling', { userId, feeling });
  });
};
