import SocketIdUUIDpairDB  from '../utils/sqllit3.js';  
const dbInstance = SocketIdUUIDpairDB.getInstance();

export const initSocket =  (io) => {
  io.of("/master_gateway").on("connection",  async (socket) => {
    const UUID = socket.handshake.query.UUID;
    
    // Insert the UUID and socket.id into the database
     await dbInstance.insert(UUID, socket.id, (err, result) => {
        if (err) {
            console.error('Insert failed:', err);
        } else {
            console.log('Insert successful:', result);
        }
    });
  });
};
