import React from "react";
import "./profile.css";

const Profile = ({ sideNavbar }) => {
  return (
    <div className="profilePage">
      {/* CHANNEL HEADER */}
      <div className="profileHeader">
        <img
          className="profileAvatar"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Channel"
        />

        <div className="profileInfo">
          <h1 className="profileName">user1</h1>
          <div className="profileStats">
            <span>@user1</span>
            <span>•</span>
            <span>1.2M subscribers</span>
            <span>•</span>
            <span>3 videos</span>
          </div>
          <div className="profileDesc">user1</div>
        </div>

        <button className="profileSubscribeBtn">Subscribe</button>
      </div>

      {/* TABS */}
      <div className="profileTabs">
        <div className="profileTab active">Videos</div>
      </div>

      {/* VIDEO GRID */}
      <div className="profileVideos">
        {[1, 2, 3].map((i) => (
          <div key={i} className="profileVideoCard">
            <img
              src={
                i === 1
                  ? "https://i.ytimg.com/vi/bIsp1K8eJG0/maxresdefault.jpg"
                  : i === 2
                  ? "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                  : "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg"
              }
              alt=""
              className="profileVideoThumb"
            />

            <div className="profileVideoInfo">
              <div className="profileVideoTitle">
                {i === 1
                  ? "jhgu"
                  : i === 2
                  ? "Video Thumbnail in 2024"
                  : "Instagram Clone Tutorial with React JS in 2024 | MERN Full Stack"}
              </div>

              <div className="profileVideoMeta">Created at 2024-07-07</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
