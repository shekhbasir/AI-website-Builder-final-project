import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieparser from "cookie-parser";
import mongoose from "mongoose";
import Databaseconnect from "./config/db.js";
import auth from "./routes/Auth.js"
import sabdata from "./routes/User.js";

const app=express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

///here i am going to wrting the API
app.use("/auth",auth);

app.use("/user",sabdata);





const PORT=process.env.PORT||7000;

app.listen(PORT,()=>{
  console.log(`this is the link http://localhost:${PORT}`);
  Databaseconnect();
})

