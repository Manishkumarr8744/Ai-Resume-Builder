import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("connected to mongodb atlas")
        })
        let mongodb_uri=process.env.MONGODB_URI;
        let projectName="Resume-Builder"

        if(!mongodb_uri){
            throw new Error("Mongodb URI not set!!!")
        }
        if(mongodb_uri.endsWith('/')){
            mongodb_uri=mongodb_uri.slice(0,-1)
        }
        await mongoose.connect(`${mongodb_uri}/${projectName}`)
    }catch(error){
        console.log("error in connecting database",error)
    }
}

export default connectDB;