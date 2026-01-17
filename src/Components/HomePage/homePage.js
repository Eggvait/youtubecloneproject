import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";
import API from "../../api/api";

const HomePage = ({ sideNavbar }) => {
  const [videos, setVideos] = useState([]);

  const options = [
    "All",
    "Music",
    "Sports",
    "Gaming",
    "News",
    "Movies",
    "Fashion",
    "Learning",
    "Live",
  ];

  /* ---------------- FETCH VIDEOS ---------------- */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/video");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    fetchVideos();
  }, []);

  /* ---------------- TIME FORMAT ---------------- */
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const days = Math.floor(seconds / 86400);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    const hours = Math.floor(seconds / 3600);
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="homePage">
      {/* ================= OPTIONS BAR ================= */}
      <div
        className={`homePage_options ${
          sideNavbar ? "withSidebar" : "noSidebar"
        }`}
      >
        <div className="optionsScroller">
          {options.map((item, index) => (
            <div key={index} className="homepage_option">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="home_mainPage">
        {videos.length === 0 && (
          <p style={{ color: "gray" }}>No videos uploaded yet</p>
        )}

        {videos.map((video) => (
          <Link
            to={`/video/${video._id}`}
            key={video._id}
            className="youtube_Video"
          >
            <div className="youtube_thumbnailBox">
              <img
                src={video.thumbnailUrl}
                className="youtube_thumbnailPic"
                alt={video.title}
              />
            </div>

            <div className="youtube_videoInfo">
              <img
                className="youtube_channelIcon"
                src={
                  video.userId?.profileImage ||
                  "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-29.jpg"
                }
                alt="channel"
              />

              <div className="youtube_textInfo">
                <div className="youtube_videoTitle">
                  {video.title}
                </div>

                <div className="youtube_channelName">
                  {video.userId?.channelName || "Unknown Channel"}
                </div>

                <div className="youtube_videoMeta">
                  {video.views} views • {timeAgo(video.createdAt)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
