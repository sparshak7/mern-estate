import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.listen(port, ()=>{
  console.log(`Server running at port ${port}`);
})