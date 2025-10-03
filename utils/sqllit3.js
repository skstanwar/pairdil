import sqlite3Init from 'sqlite3';
const sqlite3 = sqlite3Init.verbose();

export default class SocketIdUUIDpairDB {
        constructor() {
            if (SocketIdUUIDpairDB.instance) {
                return SocketIdUUIDpairDB.instance;
            }

            this.db = new sqlite3.Database('./SocketIdUUIDpair.db');

            // Wrap table creation in a Promise
            this.ready = new Promise((resolve, reject) => {
                this.db.run(`
                    CREATE TABLE IF NOT EXISTS SocketIdUUIDpair (
                        UUID TEXT PRIMARY KEY,
                        socketId TEXT
                    )
                `, (err) => {
                    if (err) {
                        console.error('Failed to create table:', err.message);
                        reject(err);
                    } else {
                        console.log('Table SocketIdUUIDpair is ready.');
                        resolve();
                    }
                });
            });

            SocketIdUUIDpairDB.instance = this;
        }

        static getInstance() {
            if (!SocketIdUUIDpairDB.instance) {
                SocketIdUUIDpairDB.instance = new SocketIdUUIDpairDB();
            }
            return SocketIdUUIDpairDB.instance;
        }

        async insert(UUID, socketId, callback) {
            await this.ready;
            const sql = `INSERT OR REPLACE INTO SocketIdUUIDpair (UUID, socketId) VALUES (?, ?)`;
            this.db.run(sql, [UUID, socketId], function(err) {
                if (err) {
                    console.error(err.message);
                    return callback(err);
                }
                callback(null, UUID);
            });
        }

    async update(UUID, socketId, callback) {
        const sql = `UPDATE SocketIdUUIDpair SET socketId = ? WHERE UUID = ?`;
        this.db.run(sql, [socketId, UUID], function(err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            callback(null, this.changes);
        });
    }

   async delete(UUID, callback) {
        const sql = `DELETE FROM SocketIdUUIDpair WHERE UUID = ?`;
        this.db.run(sql, [UUID], function(err) {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            callback(null, this.changes);
        });
    }

    async get(UUID, callback) {
        const sql = `SELECT socketId FROM SocketIdUUIDpair WHERE UUID = ?`;
        this.db.get(sql, [UUID], (err, row) => {
            if (err) {
                console.error(err.message);
                return callback(err);
            }
            console.log(row.socketId)
            callback(null, row ? row.socketId : null);
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    }
}
