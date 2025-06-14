import express from 'express';
import {authenticateUser} from "../middlewares/auth.middleware.js"
import {sendotptophone, verifyotp} from "../controllers/auth.controller.js"
const auth = express.Router();
auth.post("/sendotptophone",authenticateUser,sendotptophone)
auth.post("/verifyotp",authenticateUser,verifyotp)

export {auth}