import React from "react";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState(
    "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-29.jpg"
  );
  const [navbarModal, setNavbarModal] = useState(false);
  const navigate = useNavigate();

  const handleClickModal = () => {
    setNavbarModal((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const handleProfile = () => {
    navigate("/user/324243");
    setNavbarModal(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to={"/"} className="navbar_youtubeimg">
          <YouTubeIcon
            sx={{ fontSize: "34px" }}
            className="navbar_youtubeimage"
          />
          <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>
      <div className="navbar-middle">
        <div className="navbar_searchbox">
          <input
            type="text"
            className="navbar_searchBoxinput"
            placeholder="Search"
          />
          <div className="navbar_searchIcon">
            <SearchIcon sx={{ fontSize: "20px", color: "white" }} />
          </div>
        </div>

        <div className="navbar_voiceIcon">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      <div className="navbar-right">
        <Link to={'/23232323/upload'}>
          <VideoCallIcon
            sx={{ color: "white", fontSize: "30px", cursor: "pointer" }}
          />
        </Link>
        <NotificationsIcon
          sx={{ color: "white", fontSize: "30px", cursor: "pointer" }}
        />
        <img
          onClick={handleClickModal}
          src={userPic}
          className="navbar-right-logo"
          alt="logo"
        />

        {navbarModal && (
          <div className="navbar-modal">
            <div className="navbar-modal-option" onClick={handleProfile}>
              Profile
            </div>
            <div className="navbar-modal-option">Logout</div>
            <div className="navbar-modal-option">Login</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
