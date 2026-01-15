import React from "react";
import "./navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

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
    <div className="navbar-middle">
        <div className="navbar_searchbox">
          <input type="text" className="navbar_searchBoxinput" placeholder="Search"/>
          <div className="navbar_searchIcon">
            <SearchIcon sx={{fontSize: "20px", color: "white"}} />
          </div>
        </div>

        S
        <div className="navbar_voiceIcon">
          <KeyboardVoiceIcon sx ={{color: "white"}}/>
        </div>
    </div>
  </div>;
};

export default Navbar;
