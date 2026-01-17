import "./App.css";
import Navbar from "./Components/Navbar_TEMP/navbar";
import Home from "./Pages/Home/home";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video/video";
import Profile from "./Pages/Profile/profile";
import SideNavbar from "./Components/SideNavbar/sideNavbar_TEMP";
import VideoUpload from "./Pages/VideoUpload/videoUpload";
import SignUp from "./Pages/SignUp/signUp";
import API from "./api/api";

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [user, setUser] = useState(null);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  // 🔐 Restore login on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      API.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />

      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />

        <Route path="/video/:id" element={<Video />} />

        <Route
          path="/user/:id"
          element={
            <div style={{ display: "flex" }}>
              {sideNavbar && <SideNavbar sideNavbar={sideNavbar} />}
              <Profile />
            </div>
          }
        />

        <Route path="/:id/upload" element={<VideoUpload />} />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
