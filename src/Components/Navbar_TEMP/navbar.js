import React from "react";
import "./navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = () => {
  return <div className="navbar">
    <div className ="navbar-left">
        <div className="navbarHamberger">
          <MenuIcon sx ={{color: "white"}}/>
        </div>
        <div className="navbar_youtubeimg">
          <YouTubeIcon sx={{fontSize: "34px" }} className="navbar_youtubeimage"/>
          <div className="navbar_utubeTitle">YouTube</div>
        </div>
      </div>
  </div>;
};

export default Navbar;
