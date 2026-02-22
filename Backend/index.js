//here i am going to setup the code 

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
import Databaseconnect from "./config/db.js";

//now i am goig to setup the middle ware 
const app=express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))



//now i am going too using the port in the .env file and using that code 
const port=process.env.PORT|5000;

app.listen(port,()=>{
  console.log(`this is the link http://localhost:${port}`);
  Databaseconnect();
})

//yess i aconnected database now i am ging to too wrting the code for the model and the schema design 