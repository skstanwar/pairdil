import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
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

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve public folder (landing page, html, css, js)
app.use(express.static(path.join(__dirname, "public")));
// Serve static folder (images, docs, other assets)
app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.use("/api/auth", auth);
app.use("/api/user", userRoutes);
app.use("/api/pair", pair);
export default app;
