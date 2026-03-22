import React, { useEffect, useState } from "react";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { FaRocket, FaExternalLinkAlt } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashbord() {
  const sabdata = useSelector((state) => state.user.userData);
  const hamarnavigate = useNavigate();

  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Corrected deploy handler
  const handlewebsitedeply = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:8000/website/deploy/${id}`,
        { withCredentials: true }, // send cookies for isAuthenticated
      );
      if (result.data.url) {
        window.open(result.data.url, "_blank");
      } else {
        console.log("Deploy URL not returned");
      }
    } catch (error) {
      console.log("Deploy error:", error?.response?.data?.message || error);
    }
  };

  // fetch websites
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get("http://localhost:8000/website/getall", {
          withCredentials: true,
        });
        setWebsites(res.data);
      } catch (err) {
        console.log(
          "Fetch websites error:",
          err?.response?.data?.message || err,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

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
              className="hover:text-gray-400 transition"
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
            onClick={() => hamarnavigate("/generate")}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border border-yellow-500/40 hover:border-yellow-400 transition"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <RiAiGenerate size={22} className="text-yellow-400" />
            </motion.div>
            <span className="text-sm font-semibold text-yellow-400">
              Generate
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Welcome */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-2"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 mb-14"
        >
          {sabdata?.name}
        </motion.p>

        {/* Websites Grid */}
        {loading ? (
          <p className="text-gray-400">Loading websites...</p>
        ) : websites.length === 0 ? (
          <p className="text-gray-500">No websites created yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((site, index) => (
              <motion.div
                key={site._id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer
                  bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-pink-500/30
                  border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition"
              >
                {/* WEBSITE PREVIEW */}
                <div className="relative w-full h-[170px] bg-black overflow-hidden">
                  {/* Browser Header */}
                  <div className="absolute top-0 left-0 w-full h-7 bg-neutral-900 flex items-center gap-2 px-3 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  {/* Preview */}
                  <div className="absolute top-7 left-0 w-full h-[calc(100%-28px)] overflow-hidden">
                    <iframe
                      srcDoc={site.latestcode}
                      title="preview"
                      loading="lazy"
                      className="w-[1200px] h-[900px] scale-[0.35] origin-top-left pointer-events-none"
                    />
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-white font-stretch-50% mb-2 line-clamp-2">
                    {site.title}
                  </h2>

                  <p className="text-xs text-gray-300 mb-5">
                    Created {new Date(site.createdAt).toLocaleDateString()}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-3">
                    {/* OPEN EDITOR */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => hamarnavigate(`/editor/${site._id}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                        bg-gradient-to-r from-yellow-400 to-orange-500
                        text-black hover:opacity-90 transition cursor-pointer"
                    >
                      ✏️ Open Editor
                    </motion.button>

                    {/* DEPLOY BUTTON */}
                    {!site.deployed && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                          bg-gradient-to-r from-green-400 to-emerald-500
                          text-black font-semibold hover:opacity-90 cursor-pointer"
                        onClick={() => handlewebsitedeply(site._id)} // ✅ Correct usage
                      >
                        <FaRocket />
                        Deploy
                      </motion.button>
                    )}

                    {/* SHARE / VISIT BUTTON */}
                    {site.deployed && (
                      <motion.a
                        href={site.deployUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                          bg-gradient-to-r from-blue-400 to-cyan-500
                          text-black font-semibold hover:opacity-90"
                      >
                        <FaExternalLinkAlt />
                        Share Link
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashbord;
