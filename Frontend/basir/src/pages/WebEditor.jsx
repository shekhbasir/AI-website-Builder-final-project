import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaExpand,
  FaEye,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import Editor from "@monaco-editor/react";

function WebEditor() {
  const { id } = useParams();

  const [website, setWebsite] = useState(null);
  const [err, setError] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);
  const [showp, setshowp] = useState(false);
  const hamarnavigae = useNavigate();

  const handleUpdate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    const userMessage = { role: "user", content: prompt };
    setMessage((prev) => [...prev, userMessage]);

    try {
      const result = await axios.post(
        `http://localhost:8000/website/update/${id}`,
        { prompt },
        { withCredentials: true },
      );

      const aiMessage = {
        role: "ai",
        content: result.data.message,
      };

      setMessage((prev) => [...prev, aiMessage]);

      setCode(result.data.code);

      setPrompt("");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const goohome = () => {
    hamarnavigae("/");
  };

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/website/getwebsite/${id}`,
          { withCredentials: true },
        );

        setWebsite(res.data);
        setCode(res.data.latestcode);
        setMessage(res.data.converasation || []);
      } catch (err) {
        console.log(err);
        setError(err?.response?.data?.message || "Error loading website");
      }
    };

    fetchWebsite();
  }, [id]);

  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        Loading Editor...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* TOP BAR */}

      <div className="flex justify-between items-center px-6 py-3 border-b border-white/10">
        <h2 className="font-semibold text-lg">{website.title}</h2>

        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded hover:bg-white/20"
            onClick={() => setshowp(true)}
          >
            <FaEye /> Live Preview
          </button>

          <button
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded hover:bg-white/20"
            onClick={() => setshow(true)}
          >
            <FaCode /> Full Code
          </button>

          <button className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400">
            <FaRocket /> Deploy
          </button>

          <button
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded hover:bg-white/20"
            onClick={goohome}
          >
            <FaHome /> Home
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT */}

      <div className="flex flex-1 overflow-hidden">
        {/* CHAT SIDE */}

        <div className="w-[35%] border-r border-white/10 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {message.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-800"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </motion.div>
            ))}
          </div>

          {/* INPUT */}

          <div className="p-4 border-t border-white/10 flex gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="Ask AI to modify website..."
              className="flex-1 bg-black border border-white/20 px-4 py-2 rounded outline-none"
            />

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>
        </div>

        {/* WEBSITE PREVIEW */}

        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-white">
            <iframe
              srcDoc={code}
              title="preview"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>

      {/* FULL CODE DRAWER */}

      {show && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-[50%] h-full bg-black border-l border-white/10 z-50 flex flex-col"
        >
          {/* HEADER */}

          <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
            <h3 className="font-semibold">Full Code</h3>

            <button
              onClick={() => setshow(false)}
              className="text-white hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>

          {/* MONACO EDITOR */}

          <div className="flex-1">
            <Editor
              height="100%"
              language="html"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              onMount={(editor, monaco) => {
                setTimeout(() => {
                  editor.getAction("editor.action.formatDocument").run();
                }, 200);
              }}
              options={{
                wordWrap: "on",
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
              }}
            />
          </div>
        </motion.div>
      )}
      {showp && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col">
          {/* Top Bar */}

          <div className="flex justify-between items-center px-6 py-3 border-b border-white/10 bg-black text-white">
            <h2 className="text-lg font-semibold">Full Preview</h2>

            <button
              onClick={() => setshowp(false)}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-400"
            >
              Close
            </button>
          </div>

          {/* Website Preview */}

          <div className="flex-1 bg-white">
            <iframe
              srcDoc={code}
              title="fullpreview"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WebEditor;


//now i am going to wrting the code for the dashord where alll the code wiill working 