import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Fetchdata from "../hooks/Fetchdata.jsx";
import { useSelector } from "react-redux";
import Dashbord from "./pages/Dashbord.jsx";
import Generate from "./pages/Generate.jsx";

function App() {
  const sabdata = useSelector((state) => state.user.userData);
  return (
    <>
      <Fetchdata />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/dashbord"
            element={sabdata ? <Dashbord /> : <Home />}
          ></Route>
          <Route
            path="/generate"
            element={sabdata ? <Generate /> : <Home />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
