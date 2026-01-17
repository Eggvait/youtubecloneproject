import React, { useEffect, useState } from "react";
import "./profile.css";
import { useParams, Link } from "react-router-dom";
import API from "../../api/api";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Profile = () => {
  const { id } = useParams(); // channel/user id from URL

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  /* ---------------- LOAD LOGGED-IN USER ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  /* ---------------- FETCH CHANNEL + VIDEOS ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // fetch channel user
        const channelRes = await API.get(`/auth/${id}`);
        setChannel(channelRes.data);

        // fetch channel videos
        const videosRes = await API.get(`/video/user/${id}`);
        setVideos(videosRes.data);

        // check subscription state
        if (user) {
          setIsSubscribed(
            user.subscribedUsers?.includes(channelRes.data._id)
          );
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, [id, user]);

  /* ---------------- SUBSCRIBE / UNSUBSCRIBE ---------------- */
  const toggleSubscribe = async () => {
    if (!user || !channel) return;

    if (isSubscribed) {
      await API.post(`/auth/${channel._id}/unsubscribe`);
    } else {
      await API.post(`/auth/${channel._id}/subscribe`);
    }

    // update channel subscribers count
    const updatedChannel = await API.get(`/auth/${channel._id}`);
    setChannel(updatedChannel.data);

    // update local user
    const updatedUser = {
      ...user,
      subscribedUsers: user.subscribedUsers || [],
    };

    if (isSubscribed) {
      updatedUser.subscribedUsers = updatedUser.subscribedUsers.filter(
        (uid) => uid !== channel._id
      );
    } else {
      updatedUser.subscribedUsers.push(channel._id);
    }

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsSubscribed(!isSubscribed);
  };

  if (!channel) return null;

  return (
    <div className="profilePage">
      {/* ================= CHANNEL HEADER ================= */}
      <div className="profileHeader">
        <img
          className="profileAvatar"
          src={channel.profileImage || DEFAULT_AVATAR}
          alt="Channel"
        />

        <div className="profileInfo">
          <h1 className="profileName">{channel.channelName}</h1>

          <div className="profileStats">
            <span>@{channel.username}</span>
            <span>•</span>
            <span>{channel.subscribers} subscribers</span>
            <span>•</span>
            <span>{videos.length} videos</span>
          </div>

          <div className="profileDesc">{channel.about}</div>
        </div>

        {user && user._id !== channel._id && (
          <button
            className={
              isSubscribed ? "profileSubscribedBtn" : "profileSubscribeBtn"
            }
            onClick={toggleSubscribe}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </div>

      {/* ================= TABS ================= */}
      <div className="profileTabs">
        <div className="profileTab active">Videos</div>
      </div>

      {/* ================= VIDEO GRID ================= */}
      <div className="profileVideos">
        {videos.map((v) => (
          <Link
            to={`/video/${v._id}`}
            key={v._id}
            className="profileVideoCard"
          >
            <img
              src={v.thumbnailUrl}
              alt=""
              className="profileVideoThumb"
            />

            <div className="profileVideoInfo">
              <div className="profileVideoTitle">{v.title}</div>
              <div className="profileVideoMeta">
                {new Date(v.createdAt).toDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
