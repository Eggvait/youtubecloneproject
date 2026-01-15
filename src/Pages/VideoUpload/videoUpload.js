import React, { useState } from "react";
import "./videoUpload.css";
import { Link } from "react-router-dom";
import axios from "axios";

const VideoUpload = () => {
  const [thumbnailName, setThumbnailName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [uploadField, setUploadField] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: null,
    video: null,
    thumbnailUrl: "",
    videoUrl: "",
  });

  // 🔹 Upload thumbnail (image)
  const uploadThumbnail = async (file) => {
    try {
      setUploadingThumb(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "youtube-clone");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/du0hnwxpb/image/upload",
        data
      );

      console.log("THUMBNAIL UPLOADED:", res.data.secure_url);

      setUploadField((prev) => ({
        ...prev,
        thumbnailUrl: res.data.secure_url,
      }));
    } catch (err) {
      console.error("THUMBNAIL UPLOAD FAILED:", err.response?.data || err);
    } finally {
      setUploadingThumb(false);
    }
  };

  // 🔹 Upload video
  const uploadVideo = async (file) => {
    try {
      setUploadingVideo(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "youtube-video");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/du0hnwxpb/video/upload",
        data
      );

      console.log("VIDEO UPLOADED:", res.data.secure_url);

      setUploadField((prev) => ({
        ...prev,
        videoUrl: res.data.secure_url,
      }));
    } catch (err) {
      console.error("VIDEO UPLOAD FAILED:", err.response?.data || err.message);
    } finally {
      setUploadingVideo(false);
    }
  };

  console.log("UPLOAD STATE:", uploadField);

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
            value={uploadField.title}
            onChange={(e) =>
              setUploadField({ ...uploadField, title: e.target.value })
            }
          />

          <textarea
            rows="4"
            placeholder="Description"
            className="uploadTextarea"
            value={uploadField.description}
            onChange={(e) =>
              setUploadField({
                ...uploadField,
                description: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="uploadInput"
            value={uploadField.category}
            onChange={(e) =>
              setUploadField({
                ...uploadField,
                category: e.target.value,
              })
            }
          />

          {/* THUMBNAIL */}
          <div className="uploadFileRow">
            <label>Thumbnail</label>

            <label className="fileButton">
              {uploadingThumb ? "Uploading..." : "Choose thumbnail"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setThumbnailName(file.name);
                  setUploadField((prev) => ({
                    ...prev,
                    thumbnail: file,
                  }));

                  // 🚀 TEST MODE upload
                  uploadThumbnail(file);
                }}
              />
            </label>

            {thumbnailName && <span className="fileName">{thumbnailName}</span>}
          </div>

          {/* VIDEO */}
          <div className="uploadFileRow">
            <label>Video</label>

            <label className="fileButton">
              {uploadingVideo ? "Uploading..." : "Choose video"}
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setVideoName(file.name);
                  setUploadField((prev) => ({
                    ...prev,
                    video: file,
                  }));

                  // 🚀 TEST MODE upload
                  uploadVideo(file);
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
