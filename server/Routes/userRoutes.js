import express from "express";
import { getUserData, getUserResume, loginUser, registerUser } from "../Controllers/userController.js";
import protect from "../Middlewares/authMiddleware.js";


const userRouter=express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/getUserData",protect,getUserData)
userRouter.get("/userResume",protect,getUserResume)

export default userRouter