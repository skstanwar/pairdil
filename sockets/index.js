// sockets/index.js
import { registerLocationSocket } from "./locationSocket.js";
import { registerFeelingSocket } from "./feelingSocket.js";
import { registerchatSocket } from "./chatSocket.js";

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("join", (room) => {
      socket.join(room);
      console.log(`${socket.id} joined room ${room}`);
      socket.to(room).emit("user-joined", socket.id);
    });

    socket.on("signal", (data) => {
      // data: { room, signalData, to }
      // Relay signaling data to target peer
      io.to(data.to).emit("signal", {
        from: socket.id,
        signalData: data.signalData,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
    });
  });

  server.listen(3000, () => {
    console.log("Signaling server running on port 3000");
  });
};
