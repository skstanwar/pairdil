import SocketIdUUIDpairDB  from '../utils/sqllit3.js';  
const dbInstance = SocketIdUUIDpairDB.getInstance();

export const initSocket = (io) => {
  io.of("/master_gateway").on("connection", async (socket) => {
    const UUID = socket.handshake.query.UUID;

    // Insert the UUID and socket.id into the database
    await dbInstance.insert(UUID, socket.id, (err, result) => {
      if (err) {
        console.error("Insert failed:", err);
      } else {
        console.log("Insert successful:", result);
      }
    });

    // Handle disconnect: remove UUID from DB
    socket.on("disconnect", async () => {
      console.log(`Socket disconnected: ${socket.id} (UUID: ${UUID})`);

      await dbInstance.delete(UUID, (err, changes) => {
        if (err) {
          console.error(`Failed to delete UUID ${UUID} from DB:`, err);
        } else if (changes > 0) {
          console.log(`UUID ${UUID} removed from DB on disconnect.`);
        } else {
          console.warn(`No DB entry found for UUID ${UUID} on disconnect.`);
        }
      });
    });
  });
};
