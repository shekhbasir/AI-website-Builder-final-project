import React from "react";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { RiAiGenerate } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashbord() {
  const sabdata = useSelector((state) => state.user.userData);
  const hamarnavigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3 cursor-pointer">
            <BiSolidLeftArrowSquare
              size={28}
              className="hover:text-gray-400 transition duration-300"
              onClick={() => hamarnavigate("/")}
            />
            <span
              className="text-lg font-semibold tracking-wide"
              onClick={() => hamarnavigate("/")}
            >
              Dashboard
            </span>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border border-yellow-500/40 
                       hover:border-yellow-400 transition duration-300"
          >
            {/* Animated Icon */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <RiAiGenerate
                size={22}
                className="text-yellow-400"
                onClick={() => hamarnavigate("/generate")}
              />
            </motion.div>

            <span
              className="text-sm font-semibold text-yellow-400 cursor-pointer"
              onClick={() => hamarnavigate("/generate")}
            >
              Generate
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Welcome */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-4"
        >
          Welcome Back
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-400 mb-12"
        >
          {sabdata?.name}
        </motion.p>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className="p-10 rounded-xl border border-white/10 
                     bg-gradient-to-b from-white/5 to-white/3 
                     backdrop-blur-md transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-3 text-yellow-400">
            Start Building with AI
          </h2>

          <p className="text-gray-400 mb-8">
            Create your AI-powered website in seconds with powerful automation
            tools.
          </p>

          {/* Create Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255, 215, 0, 0.4)",
            }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3 rounded-lg 
                       bg-gradient-to-r from-yellow-500 to-yellow-400 
                       text-black font-semibold tracking-wide
                       transition-all duration-300 cursor-pointer"
            onClick={() => hamarnavigate("/generate")}
          >
            Create New Website
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashbord;

//this is the noraml thing that is there i am using
