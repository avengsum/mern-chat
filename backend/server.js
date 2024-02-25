import express, { response } from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())



app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)


(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connnected to MongoDb")
  } catch (error) {
    console.log("error while connecting to database error: ",error)
  }
})()

app.listen(PORT,() => {
  console.log("lisintng on port")
})

