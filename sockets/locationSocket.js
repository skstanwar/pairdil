// sockets/locationSocket.js
export const registerLocationSocket = (io, socket) => {
  socket.on('send_location', ({ userId, coordinates }) => {
    console.log(`📍 Location update from ${userId}:`, coordinates);

    // Broadcast to user's partner (in real case, you’d look up their partnerId)
    socket.broadcast.emit('receive_location', { userId, coordinates });
  });
};
