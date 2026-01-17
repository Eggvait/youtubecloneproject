import React, { useState } from "react";
import "./videoUpload.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";

const VideoUpload = () => {
  const navigate = useNavigate();

  const [thumbnailName, setThumbnailName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [uploadField, setUploadField] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: "",
    videoUrl: "",
  });

  /* ---------- CLOUDINARY UPLOADS ---------- */

  const uploadThumbnail = async (file) => {
    try {
      setUploadingThumb(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "youtube-clone");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/du0hnwxpb/image/upload",
        { method: "POST", body: data }
      ).then((r) => r.json());

      setUploadField((prev) => ({
        ...prev,
        thumbnailUrl: res.secure_url,
      }));
    } catch (err) {
      alert("Thumbnail upload failed");
    } finally {
      setUploadingThumb(false);
    }
  };

  const uploadVideo = async (file) => {
    try {
      setUploadingVideo(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "youtube-video");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/du0hnwxpb/video/upload",
        { method: "POST", body: data }
      ).then((r) => r.json());

      setUploadField((prev) => ({
        ...prev,
        videoUrl: res.secure_url,
      }));
    } catch (err) {
      alert("Video upload failed");
    } finally {
      setUploadingVideo(false);
    }
  };

  /* ---------- FINAL BACKEND UPLOAD ---------- */

  const handleFinalUpload = async () => {
    if (
      !uploadField.title ||
      !uploadField.thumbnailUrl ||
      !uploadField.videoUrl
    ) {
      alert("Please complete all required fields");
      return;
    }

    try {
      await API.post("/video", uploadField);
      alert("Video uploaded successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="uploadPage">
      <div className="uploadCard">
        <div className="uploadHeader">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
          />
          <h2>Upload Video</h2>
        </div>

        <div className="uploadForm">
          <input
            className="uploadInput"
            placeholder="Title"
            value={uploadField.title}
            onChange={(e) =>
              setUploadField({ ...uploadField, title: e.target.value })
            }
          />

          <textarea
            className="uploadTextarea"
            placeholder="Description"
            rows={4}
            value={uploadField.description}
            onChange={(e) =>
              setUploadField({ ...uploadField, description: e.target.value })
            }
          />

          <input
            className="uploadInput"
            placeholder="Category"
            value={uploadField.category}
            onChange={(e) =>
              setUploadField({ ...uploadField, category: e.target.value })
            }
          />

          <div className="uploadFileRow">
            <label className="fileButton">
              {uploadingThumb ? "Uploading..." : "Choose thumbnail"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setThumbnailName(file.name);
                  uploadThumbnail(file);
                }}
              />
            </label>
            {thumbnailName && <span>{thumbnailName}</span>}
          </div>

          <div className="uploadFileRow">
            <label className="fileButton">
              {uploadingVideo ? "Uploading..." : "Choose video"}
              <input
                type="file"
                hidden
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setVideoName(file.name);
                  uploadVideo(file);
                }}
              />
            </label>
            {videoName && <span>{videoName}</span>}
          </div>

          <div className="uploadActions">
            <button className="uploadBtn" onClick={handleFinalUpload}>
              Upload
            </button>
            <Link to="/">
              <button className="cancelBtn">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
