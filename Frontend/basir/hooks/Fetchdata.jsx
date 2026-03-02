import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";

function Fetchdata() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getcurrentData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8000/user/currentData",
          { withCredentials: true },
        );
        dispatch(setUserData(result.data.sabdata));
      } catch (error) {
        console.log("errro from the  current data frotnend", error);
      }
    };
    getcurrentData();
  }, []);
}

export default Fetchdata;

//here i am going to writn=g the code for that
