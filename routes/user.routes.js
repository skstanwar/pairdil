import express from 'express';
import {authenticateUser} from "../middlewares/auth.middleware.js"
import {login, register,getProfile, updateProfile} from "../controllers/user.controller.js"
const userRoutes = express.Router();
userRoutes.post("/login",login)
userRoutes.post("/register",register)
userRoutes.get("/getprofile",authenticateUser,getProfile)
userRoutes.put("/update",authenticateUser,updateProfile)

export {userRoutes}