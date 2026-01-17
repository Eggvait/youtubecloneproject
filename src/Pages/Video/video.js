import React, { useEffect, useState } from "react";
import "./video.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { Link, useParams } from "react-router-dom";
import API from "../../api/api";

const Video = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentFocus, setCommentFocus] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  /* ---------------- LOAD USER ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  /* ---------------- FETCH VIDEO ---------------- */
  useEffect(() => {
    const fetchAll = async () => {
      const videoRes = await API.get(`/video/${id}`);
      setVideo(videoRes.data);

      await API.post(`/video/${id}/view`);

      const commentsRes = await API.get(`/comment/${id}`);
      setComments(commentsRes.data);

      const suggestionsRes = await API.get("/video");
      setSuggestions(suggestionsRes.data.filter((v) => v._id !== id));

      if (user) {
        setIsSubscribed(
          user.subscribedUsers?.includes(videoRes.data.userId._id),
        );
      }
    };

    fetchAll();
  }, [id, user]);

  /* ---------------- ACTIONS ---------------- */

  const toggleSubscribe = async () => {
    if (!user) return;

    if (isSubscribed) {
      await API.post(`/auth/${video.userId._id}/unsubscribe`);
    } else {
      await API.post(`/auth/${video.userId._id}/subscribe`);
    }

    // Refresh video data
    const updatedVideo = await API.get(`/video/${id}`);
    setVideo(updatedVideo.data);

    // Safe user update
    const updatedUser = {
      ...user,
      subscribedUsers: user.subscribedUsers || [],
    };

    if (isSubscribed) {
      updatedUser.subscribedUsers = updatedUser.subscribedUsers.filter(
        (uid) => uid !== video.userId._id,
      );
    } else {
      updatedUser.subscribedUsers.push(video.userId._id);
    }

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsSubscribed(!isSubscribed);
  };

  const likeVideo = async () => {
    await API.post(`/video/${id}/like`);
    const res = await API.get(`/video/${id}`);
    setVideo(res.data);
  };

  const dislikeVideo = async () => {
    await API.post(`/video/${id}/dislike`);
    const res = await API.get(`/video/${id}`);
    setVideo(res.data);
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    await API.post("/comment", { videoId: id, text: comment });

    setComment("");
    setCommentFocus(false);

    const res = await API.get(`/comment/${id}`);
    setComments(res.data);
  };

  if (!video) return null;

  return (
    <div className="videoPage">
      <div className="videoLayout">
        {/* LEFT */}
        <div className="videoMain">
          <div className="videoPlayer">
            <video controls autoPlay className="videoPlayer_video">
              <source src={video.videoUrl} type="video/mp4" />
            </video>
          </div>

          <h1 className="videoTitle">{video.title}</h1>

          <div className="videoActions">
            <div className="videoActions_left">
              <Link to={`/user/${video.userId._id}`}>
                <img
                  src={video.userId.profileImage}
                  className="videoChannelImg"
                />
              </Link>

              <div className="videoChannelInfo">
                <div className="videoChannelName">
                  {video.userId.channelName}
                </div>
                <div className="videoChannelSubs">
                  {video.userId.subscribers} subscribers
                </div>
              </div>

              {user && user._id !== video.userId._id && (
                <button
                  className={isSubscribed ? "subscribedBtn" : "subscribeBtn"}
                  onClick={toggleSubscribe}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
              )}
            </div>

            <div className="youtube_video_likeBlock">
              <div onClick={likeVideo} className="youtube_video_likeIcon">
                <ThumbUpAltOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
                <div>{video.likes.length}</div>
              </div>
              <div className="youtubeVideoDivider" />
              <div onClick={dislikeVideo} className="youtube_video_likeIcon">
                <ThumbDownAltOutlinedIcon
                  sx={{ color: "white", fontSize: 20 }}
                />
              </div>
            </div>
          </div>

          <div className="videoDescription">
            <div className="videoDescription_stats">
              {video.views} views • {new Date(video.createdAt).toDateString()}
            </div>

            <p className={showMore ? "expanded" : "clamped"}>
              {video.description}
            </p>

            <span className="readMore" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show less" : "Read more"}
            </span>
          </div>

          <div className="videoComments">
            <h3>{comments.length} Comments</h3>

            {user && (
              <div className="commentInput">
                <img src={user.profileImage} />
                <div className="commentBox">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onFocus={() => setCommentFocus(true)}
                    placeholder="Add a comment..."
                  />
                  {commentFocus && (
                    <div className="commentActions">
                      <button onClick={() => setCommentFocus(false)}>
                        Cancel
                      </button>
                      <button onClick={addComment}>Comment</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {comments.map((c) => (
              <div key={c._id} className="comment">
                <img src={c.userId.profileImage} />
                <div>
                  <div className="commentName">{c.userId.channelName}</div>
                  <div className="commentText">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="videoSuggestions">
          <h4>Up next</h4>
          {suggestions.map((v) => (
            <Link key={v._id} to={`/video/${v._id}`} className="suggestionCard">
              <img src={v.thumbnailUrl} />
              <div>
                <div>{v.title}</div>
                <div>{v.userId.channelName}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
