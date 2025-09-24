// sockets/index.js
import { registerLocationSocket } from "./locationSocket.js";
import { registerFeelingSocket } from "./feelingSocket.js";
import { registerchatSocket } from "./chatSocket.js";

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 New client connected: ${socket.id}`);

    // Register all socket modules here
    registerLocationSocket(io, socket);
    registerFeelingSocket(io, socket);
    registerchatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });
};
