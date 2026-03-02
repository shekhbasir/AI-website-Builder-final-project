import express from "express";
import currentUser from "../controller/userData.js";
import { isAuthenticated } from "../middleware/userbaa.js";
const sabdata=express.Router();

sabdata.get("/currentData",isAuthenticated,currentUser);
export default sabdata;