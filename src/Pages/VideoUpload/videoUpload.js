import React, { useState } from "react";
import "./videoUpload.css";
import { Link } from "react-router-dom";

const VideoUpload = () => {
  const [thumbnailName, setThumbnailName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [uploadField, setUploadField] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: null,
    video: null,
  });
  console.log(uploadField);

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
            value={uploadField.title}
            onChange={(e) =>
              setUploadField({ ...uploadField, title: e.target.value })
            }
            placeholder="Title of video"
            className="uploadInput"
          />

          <textarea
            value={uploadField.description}
            onChange={(e) =>
              setUploadField({ ...uploadField, description: e.target.value })
            }
            placeholder="Description"
            rows="4"
            className="uploadTextarea"
          />

          <input
            type="text"
            value={uploadField.category}
            onChange={(e) =>
              setUploadField({ ...uploadField, category: e.target.value })
            }
            placeholder="Category"
            className="uploadInput"
          />

          {/* FILE INPUTS */}
          <div className="uploadFileRow">
            <label>Thumbnail</label>

            <label className="fileButton">
              Choose thumbnail
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setThumbnailName(file?.name || "");
                  setUploadField((prev) => ({
                    ...prev,
                    thumbnail: file,
                  }));
                }}
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
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setVideoName(file?.name || "");
                  setUploadField((prev) => ({
                    ...prev,
                    video: file,
                  }));
                }}
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
