import { useEffect, useState } from "react";
import Login from "../components/Login.jsx";
import { useSelector } from "react-redux";
import { LuCoins } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import Profile from "../components/Profile.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const arr = [
    "AI Generated Codes",
    "Fully Responsive Website",
    "Production  Ready WebSite",
  ];

  const [openlogin, setopenlogin] = useState(false);

  const sabdata = useSelector((state) => state.user.userData);

  console.log(sabdata?.email, "", sabdata?.name, "", sabdata?.avatar);
  //here i am going to using the profile stat
  const [openp, setprofile] = useState(false);
  const hamarnavigate = useNavigate();

  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div id="thisis1" className="text-white flex justify-between p-[20px]">
          <div
            className="text-[25px] font-medium  
           "
          >
            GenWeb.AI
          </div>
          <div className="flex justify-center gap-20 ">
            <button className="h-[40px] w-[100px] border border-gray-500 rounded-[10px] bg-transparent text-white cursor-pointer flex items-center justify-center">
              Pricing
            </button>

            {sabdata && (
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-orange-500 overflow-hidden cursor-pointer">
                <motion.span
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-orange-500 blur-xl"
                ></motion.span>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="relative text-orange-400 text-2xl drop-shadow-[0_0_15px_orange]"
                >
                  <LuCoins />
                </motion.div>

                <span className="relative text-orange-300 font-semibold tracking-wide">
                  Total Credits
                </span>

                <motion.span
                  key={sabdata?.credit}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="relative font-bold text-white bg-orange-600 px-4 py-1 rounded-full shadow-lg shadow-orange-500/50"
                >
                  {sabdata?.credit}
                </motion.span>
              </div>
            )}

            {!sabdata ? (
              <button
                onClick={() => setopenlogin(true)}
                className="h-[40px] font-bold hover:bg-gray-800 transition duration-200 cursor-pointer rounded-[10px] w-[100px] bg-gray-600"
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setprofile(!openp)}
                  className="relative h-[55px] w-[55px] flex items-center justify-center cursor-pointer"
                >
                  <span className="absolute inset-0 rounded-full border-[3px] border-red-500 animate-ringPulse pointer-events-none shadow-[0_0_15px_rgba(239,68,68,0.6)]"></span>

                  <img
                    className="h-[40px] w-[40px] rounded-full object-cover border-2 border-white z-10"
                    src={
                      sabdata?.avatar ||
                      `https://ui-avatars.com/api/?name=${sabdata.name}`
                    }
                    alt="profile"
                  />
                </button>

                <AnimatePresence>
                  {openp && <Profile setprofile={setprofile} />}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        <div
          id="thisis2"
          className=" flex text-white flex-col justify-center items-center p-[40px] "
        >
          <span className="font-bold text-[45px]">
            Build Stunning WebSite With
          </span>
          <p className="font-bold text-[30px] bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent ">
            {" "}
            GenWeb.Ai
          </p>{" "}
          <br />
          <p className="font-light">
            Describe Your Idea And Get Your Production Ready WebSite{" "}
          </p>{" "}
          <p className="font-light">With In Seconds</p> <br />
          {!sabdata ? (
            <button
              onClick={() => setopenlogin(true)}
              className="h-[40px] font-bold hover:bg-gray-800 transition duration-200 cursor-pointer rounded-[10px] w-[100px] bg-gray-600"
            >
              Get Started
            </button>
          ) : (
            <button
              //  abb simply Yejan Daashbord wala link set kar deham ham simply
              className="h-[40px] font-bold hover:bg-gray-800 transition duration-200 cursor-pointer rounded-[10px] w-[100px] bg-gray-600"
              onClick={() => hamarnavigate("/dashbord")}
            >
              DashBoard
            </button>
          )}
        </div>
        <div
          id="thisis3"
          className="flex justify-center items-center ml-[100px] grid grid-cols-3 p-[30px]"
        >
          {arr.map((i, k) => (
            <div
              key={k}
              className="h-[160px] w-[260px] bg-gray-950 rounded-[10px]
               flex flex-col justify-center items-center
               text-center p-4 overflow-hidden"
            >
              <p className="font-medium text-amber-200 break-words">{i}</p>

              <div className="text-white text-sm mt-2 break-words">
                <p>GenWeb.AI - Generate Full Animated</p>
                <p>Responsive, Production Ready</p>
              </div>
            </div>
          ))}
        </div>{" "}
        <hr className="text-gray-700" />
        <div className="flex justify-center items-center p-[20px] flex-row font-light">
          {" "}
          <footer className="text-white">
            &copy; {new Date().getFullYear()}{" "}
            <span>GenWeb.Ai By BasirTechnosoft</span>
          </footer>
        </div>
        <div className="">
          {openlogin && (
            <Login
              open={openlogin}
              closelogin={() => setopenlogin(false)}
              setopenlogin={setopenlogin}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Home;

//now i am going to desing the dashbord
