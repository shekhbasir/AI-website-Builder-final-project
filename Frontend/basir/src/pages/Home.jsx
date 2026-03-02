import { useState } from "react";
import Login from "../components/Login.jsx";
import { useSelector } from "react-redux";

function Home() {
  const arr = [
    "AI Generated Codes",
    "Fully Responsive Website",
    "Production  Ready WebSite",
  ];

  const [openlogin, setopenlogin] = useState(false);

  const sabdata = useSelector((state) => state.user.userData);

  //this way i am going to extract the data from the there

  console.log(sabdata?.email, "", sabdata?.name, "", sabdata?.avatar);

  //this is the path here i am going to taking the login data here and working simply
  return (
    <>
      <div className="min-h-screen w-full bg-black ">
        <div id="thisis1" className="text-white flex justify-between p-[20px]">
          <div className="text-[25px] font-medium  bg-gradient-to-r from-purple-500 to-pink-500  bg-clip-text text-transparent ">
            GenWeb.AI
          </div>
          <div className="flex justify-center gap-20 ">
            <button className="h-[40px] w-[100px] border border-gray-500 rounded-[10px] bg-transparent text-white cursor-pointer    ">
              Pricing
            </button>

            {!sabdata ? (
              <button
                onClick={() => setopenlogin(true)}
                className="h-[40px] font-bold hover:bg-gray-800 transition duration-200 cursor-pointer rounded-[10px] w-[100px] bg-gray-600"
              >
                Get Started
              </button>
            ) : (
              <button className="relative h-[60px] w-[60px] flex items-center justify-center">
                {/* Glow Ring */}
                <span className="absolute inset-0 rounded-full border-[3px] border-red-500 animate-ringPulse pointer-events-none shadow-[0_0_15px_rgba(239,68,68,0.6)]"></span>

                {/* Profile Image */}
                <img
                  className="h-[48px] w-[48px] rounded-full object-cover border-2 border-white z-10"
                  src={
                    sabdata?.avatar ||
                    `https://ui-avatars.com/api/?name=${sabdata.name}`
                  }
                  alt="profile"
                />
              </button>
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
            <Login open={openlogin} closelogin={() => setopenlogin(false)} />
          )}
        </div>
      </div>
    </>
  );
}
export default Home;

//this is nothing but this is our home from this home page i am going t
