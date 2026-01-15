import "./App.css";
import Navbar from "./Components/Navbar_TEMP/navbar";
import Home from "./Pages/Home/home";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video/video";
import Profile from "./Pages/Profile/profile";
import SideNavbar from "./Components/SideNavbar/sideNavbar_TEMP";

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };
  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route
          path="/user/:id"
          element={
            <div style={{ display: "flex" }}>
              {sideNavbar && <SideNavbar sideNavbar={sideNavbar} />}
              <Profile />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
