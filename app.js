import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js"
import {userRoutes} from "./routes/user.routes.js"
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.get("/test" , (req, res)=>{
    res.send("server is running up")
})

app.use('/api/user', userRoutes);
export default app;