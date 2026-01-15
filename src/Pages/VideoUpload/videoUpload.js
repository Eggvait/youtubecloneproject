import React, { useState } from "react";
import "./videoUpload.css";
import { Link } from "react-router-dom";

const VideoUpload = () => {
  const [thumbnailName, setThumbnailName] = useState("");
  const [videoName, setVideoName] = useState("");

  return (
    <div className="uploadPage">
      <div className="uploadCard">
        {/* HEADER */}
        <div className="uploadHeader">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
          />
          <h2>Upload Video</h2>
        </div>

        {/* FORM */}
        <div className="uploadForm">
          <input
            type="text"
            placeholder="Title of video"
            className="uploadInput"
          />

          <textarea
            placeholder="Description"
            rows="4"
            className="uploadTextarea"
          />

          <input type="text" placeholder="Category" className="uploadInput" />

          {/* FILE INPUTS */}
          <div className="uploadFileRow">
            <label>Thumbnail</label>

            <label className="fileButton">
              Choose thumbnail
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setThumbnailName(e.target.files[0]?.name || "")
                }
              />
            </label>

            {thumbnailName && <span className="fileName">{thumbnailName}</span>}
          </div>

          <div className="uploadFileRow">
            <label>Video</label>

            <label className="fileButton">
              Choose video
              <input
                type="file"
                hidden
                onChange={(e) => setVideoName(e.target.files[0]?.name || "")}
              />
            </label>

            {videoName && <span className="fileName">{videoName}</span>}
          </div>

          {/* ACTIONS */}
          <div className="uploadActions">
            <button className="uploadBtn">Upload</button>
            <Link to={"/"}>
              <button className="cancelBtn">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
