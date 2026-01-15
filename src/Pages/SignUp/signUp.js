import React, { useState } from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [signUpField, setSignUpField] = useState({
    channelName: "",
    username: "",
    password: "",
    about: "",
    profileImage: null,
    profileImageUrl: "",
  });

  // 🔹 Upload image to Cloudinary (TEST MODE)
  const uploadImage = async (file) => {
    try {
      setUploading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "youtube-clone");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/du0hnwxpb/image/upload",
        data
      );

      console.log("UPLOAD SUCCESS:", res.data.secure_url);

      setSignUpField((prev) => ({
        ...prev,
        profileImageUrl: res.data.secure_url,
      }));
    } catch (err) {
      console.error("UPLOAD FAILED:", err.response?.data || err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="signUpPage">
      <div className="signUpCard">
        {/* HEADER */}
        <div className="signUpHeader">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
          />
          <h2>Create your channel</h2>
        </div>

        {/* FORM */}
        <div className="signUpBody">
          <input
            type="text"
            placeholder="Channel name"
            value={signUpField.channelName}
            onChange={(e) =>
              setSignUpField({ ...signUpField, channelName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Username"
            value={signUpField.username}
            onChange={(e) =>
              setSignUpField({ ...signUpField, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={signUpField.password}
            onChange={(e) =>
              setSignUpField({ ...signUpField, password: e.target.value })
            }
          />

          <textarea
            rows={3}
            placeholder="About your channel"
            value={signUpField.about}
            onChange={(e) =>
              setSignUpField({ ...signUpField, about: e.target.value })
            }
          />

          {/* PROFILE IMAGE */}
          <div className="signUpImageRow">
            <div className="imagePreview">
              {preview ? (
                <img src={preview} alt="Preview" />
              ) : (
                <div className="imagePlaceholder">?</div>
              )}
            </div>

            <label className="uploadBtn">
              {uploading ? "Uploading..." : "Upload profile picture"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  // preview
                  setPreview(URL.createObjectURL(file));

                  // store file
                  setSignUpField((prev) => ({
                    ...prev,
                    profileImage: file,
                  }));

                  // 🚀 upload immediately (TEST MODE)
                  uploadImage(file);
                }}
              />
            </label>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="signUpActions">
          <button className="signUpPrimary" onClick={() => navigate("/")}>
            Sign up
          </button>

          <button className="signUpSecondary" onClick={() => navigate("/")}>
            Home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
