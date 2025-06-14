import express from 'express'
import {authenticateUser} from "../middlewares/auth.middleware.js"
const pair = express.Router()
import {paircodegenerator, paircodeverify} from "../controllers/pair.controller.js"
pair.get("/paircodegenerator",authenticateUser,paircodegenerator)
pair.post("/paircodeverify",authenticateUser,paircodeverify)

export {pair}