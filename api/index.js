import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
dotenv.config();

mongoose.connect(
  process.env.MONGO
).then(()=>{
  console.log("Connected to database");
}).catch((err)=>{
  console.log(err);
})

const app=express();
const port=3000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/listing", listingRouter);

app.listen(port, ()=>{
  console.log(`Server running at port ${port}`);
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error."
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})