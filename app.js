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
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.use("/api/auth", auth);
app.use("/api/user", userRoutes);
app.use("/api/pair", pair);
export default app;
