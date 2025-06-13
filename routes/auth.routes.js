import express from 'express';

const userRoutes = express.Router();
userRoutes.get("/auth",(req,res)=>{res.send("ok")})

export {userRoutes}