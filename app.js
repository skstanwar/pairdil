import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from "./config/db.js"
import {userRoutes} from "./routes/user.routes.js"
import {auth} from "./routes/auth.routes.js"
import {pair} from "./routes/pair.routes.js"
connectDB();
import {sql} from "./config/superbase.js"
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// (async () => {
//   try {
//     const result = await sql`SELECT * from publicidtable`;
//     console.log('✅ PostgreSQL connected. Server time:', result);
//   } catch (err) {
//     console.error('❌ Connection failed:', err.message);
//   } finally {
//     await sql.end(); // Always close the connection
//   }
// })();
app.get("/test" , (req, res)=>{
    res.send("server is running up")
})

app.use('/api/auth', auth);
app.use('/api/user', userRoutes);
app.use('/api/pair', pair);
export default app;