///this is the routes of the website simply

import express from "express";
import { isAuthenticated } from "../middleware/userbaa.js";
import { GenerateData } from "../controller/website.js";
const websiteRoutes = express.Router();

websiteRoutes.post("/generate", isAuthenticated, GenerateData);
export default websiteRoutes;

//now i am going to fetching the data from the frontend to backend
