import React, { useEffect, useState } from "react";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/login";

const DEFAULT_AVATAR =
  "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-29.jpg";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const navigate = useNavigate();

  const [navbarModal, setNavbarModal] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- LOAD USER ---------------- */
  const syncUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    syncUserFromStorage();

    // sync across login/logout
    window.addEventListener("storage", syncUserFromStorage);
    return () => window.removeEventListener("storage", syncUserFromStorage);
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const toggleSidebar = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const toggleDropdown = () => {
    setNavbarModal((prev) => !prev);
  };

  const closeLogin = () => {
    setLoginOpen(false);
    syncUserFromStorage(); // ⬅️ IMPORTANT
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setNavbarModal(false);
    navigate("/");
  };

  const handleProfile = () => {
    setNavbarModal(false);
    navigate(`/user/${user._id}`);
  };

  /* ---------------- SEARCH ---------------- */

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={toggleSidebar}>
          <MenuIcon sx={{ color: "white" }} />
        </div>

        <Link to="/" className="navbar_youtubeimg">
          <YouTubeIcon sx={{ fontSize: "34px", color: "red" }} />
          <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>

      {/* MIDDLE */}
      <div className="navbar-middle">
        <div className="navbar_searchbox">
          <input
            type="text"
            className="navbar_searchBoxinput"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
          <div className="navbar_searchIcon" onClick={handleSearch}>
            <SearchIcon sx={{ fontSize: "20px", color: "white" }} />
          </div>
        </div>

        <div className="navbar_voiceIcon">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      {/* RIGHT */}
      {/* RIGHT */}
      <div className="navbar-right">
        {/* ✅ Upload button — SAME as original behavior */}
        {user && (
          <Link to={`/${user._id}/upload`}>
            <VideoCallIcon
              sx={{ color: "white", fontSize: "30px", cursor: "pointer" }}
            />
          </Link>
        )}

        <NotificationsIcon sx={{ color: "white", fontSize: "30px" }} />

        <img
          src={user?.profileImage || DEFAULT_AVATAR}
          className="navbar-right-logo"
          onClick={toggleDropdown}
          alt="avatar"
        />

        {navbarModal && (
          <div className="navbar-dropdown">
            {user ? (
              <>
                <div className="dropdown-item" onClick={handleProfile}>
                  Your channel
                </div>
                <div className="dropdown-item danger" onClick={handleLogout}>
                  Sign out
                </div>
              </>
            ) : (
              <div
                className="dropdown-item"
                onClick={() => {
                  setNavbarModal(false);
                  setLoginOpen(true);
                }}
              >
                Sign in
              </div>
            )}
          </div>
        )}
      </div>

      {loginOpen && <Login onClose={closeLogin} />}
    </div>
  );
};

export default Navbar;
