import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase.jsx";
import { signInWithPopup, signOut } from "firebase/auth";
function Login({ open, closelogin }) {
  const HandleGoogleauth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.log(`this is the error from Login ${error}`);
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-md z-50"
          onClick={closelogin}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 text-white w-[380px] p-8 rounded-2xl shadow-2xl relative"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                GenWeb.AI
              </span>
            </h2>

            <button
              className="w-full h-[55px] bg-white text-black rounded-xl 
              flex items-center justify-center gap-3 
              font-semibold shadow-md 
              hover:shadow-lg hover:scale-[1.02] 
              transition-all duration-200 cursor-pointer "
              onClick={HandleGoogleauth}
            >
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </button>

            <button
              className="mt-4 w-full border border-gray-600 py-2 rounded-lg hover:bg-gray-800 transition duration-200 cursor-pointer text-red-500 font-bold "
              onClick={closelogin}
            >
              Cancel
            </button>
            <div className="flex justify-center items-center p-[10px] ">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xl tracking-wide text-zinc-500">
                Secure Login
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className=" text-gray-400 font-light p-[20px]">
              <span>By continuing you Agree</span>{" "}
              <span className="underline cursor-pointer hover:text-gray-500">
                Term of Service
              </span>{" "}
              <div className="flex items-center  justify-center ">
                <span className="underline cursor-pointer hover:text-gray-500">
                  privacy policy
                </span>{" "}
                <span className="p-[3px] text-gray-400">
                  BasirTechnosoft pvt ltd
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Login;
//now i am going to wrting the code for the terms and the condition

///so  that the resone i am going to wrtnig the cos=de for the
