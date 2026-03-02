import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Fetchdata from "../hooks/Fetchdata.jsx";

function App() {
  return (
    <>
      <Fetchdata />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
