// sockets/feelingSocket.js
export const registerFeelingSocket = (__io, socket) => {
  socket.on("send_feeling", (temp) => {
    console.log(`💗 Feeling update from`);

    // Broadcast to the partner
    __io.emit("receive_feeling", temp);
  });
};
