import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import { userRoutes } from "./routes/user.routes.js";
import { auth } from "./routes/auth.routes.js";
import { pair } from "./routes/pair.routes.js";
connectDB();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

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
app.get("/test", (req, res) => {
  res.send("server is running up");
});

app.use("/api/auth", auth);
app.use("/api/user", userRoutes);
app.use("/api/pair", pair);
export default app;
