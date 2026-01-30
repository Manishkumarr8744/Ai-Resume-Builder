import express from "express"
import cors from "cors"
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./Routes/userRoutes.js";
import resumeRouter from "./Routes/resumeRoutes.js";
import aiRouter from "./Routes/aiRoutes.js";

const app=express();
app.use(express.json())
app.use(cors())

const PORT=process.env.PORT || 3000;

//db connection
await connectDB()

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/api/users",userRouter)
app.use("/api/resumes",resumeRouter)
app.use("/api/ai",aiRouter)

app.listen(PORT,()=>{
    console.log(`Listening to the port ${PORT}`)
})