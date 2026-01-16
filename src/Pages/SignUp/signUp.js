import React, { useState } from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signUpField, setSignUpField] = useState({
    channelName: "",
    username: "",
    password: "",
    about: "",
    profileImage: null,
    profileImageUrl: "",
  });

  /* ============================
     CLOUDINARY UPLOAD (WORKING)
     ============================ */
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

      setSignUpField((prev) => ({
        ...prev,
        profileImageUrl: res.data.secure_url,
      }));
    } catch (err) {
      alert("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  /* ============================
     SIGNUP → BACKEND
     ============================ */
  const handleSignup = async () => {
    const { channelName, username, password } = signUpField;

    if (!channelName || !username || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/signup", {
        channelName: signUpField.channelName,
        username: signUpField.username,
        password: signUpField.password,
        about: signUpField.about,
        profileImage: signUpField.profileImageUrl, // ✅ URL, not file
      });

      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
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

                  setPreview(URL.createObjectURL(file));
                  uploadImage(file);
                }}
              />
            </label>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="signUpActions">
          <button
            className="signUpPrimary"
            onClick={handleSignup}
            disabled={loading || uploading}
          >
            {loading ? "Creating..." : "Sign up"}
          </button>

          <button
            className="signUpSecondary"
            onClick={() => navigate("/")}
          >
            Home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
