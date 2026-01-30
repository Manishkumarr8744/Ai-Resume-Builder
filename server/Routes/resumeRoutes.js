import express from "express"
import protect from "../Middlewares/authMiddleware.js"
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../Controllers/resumeController.js";
import upload from "../configs/multer.js";


const resumeRouter = express.Router();


resumeRouter.post("/create",protect,createResume);
resumeRouter.delete("/delete/:resumeId",protect,deleteResume);
resumeRouter.put("/update",upload.single('image'),protect,updateResume);
resumeRouter.get("/get/:resumeId",protect,getResumeById)
resumeRouter.get("/public/:resumeId",getPublicResumeById)

export default resumeRouter;