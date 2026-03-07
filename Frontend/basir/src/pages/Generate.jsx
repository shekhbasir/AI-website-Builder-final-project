import React, { useState } from "react";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Generate() {
  const navigate = useNavigate();
  const sabdata = useSelector((state) => state.user.userData);
  const [prompt, setPrompt] = useState("");

  const Handlegeneratewebsite = async () => {
    try {
      //here
      const result = await axios.post(
        "http://localhost:8000/website/generate",
        { prompt },
        { withCredentials: true },
      );
      console.log(result);
    } catch (error) {
      console.log("error from Generate website handle" + error);
    }
  };

  return (
    <div className="min-h-screen bg-black w-full text-white">
      {/* Navbar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <BiSolidLeftArrowSquare
              size={28}
              className="hover:text-gray-400 transition"
            />
            <span className="text-lg font-semibold tracking-wide">
              Generate.AI
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
          >
            <motion.img
              src={sabdata?.avatar}
              alt="profile"
              className="h-9 w-9 rounded-full object-cover"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <span className="text-sm font-medium">{sabdata?.name}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Build Website with
          <span className="text-yellow-400"> Real AI Power</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 mb-10"
        >
          Describe your website idea and let AI generate it instantly with
          BasirTechnosoft.Ai
        </motion.p>

        {/* Prompt Box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter Your Prompt or Idead To Get Your WebSite...."
            className="w-full h-[140px] bg-black border border-white/10 rounded-lg p-4 outline-none focus:border-yellow-400 resize-none"
          />

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(255,215,0,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 bg-gray-900  text-white  rounded-lg cursor-pointer font-bold"
            onClick={Handlegeneratewebsite}
          >
            Generate Website
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Generate;
