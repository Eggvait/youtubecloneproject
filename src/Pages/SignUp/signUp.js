import React, { useState } from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const [signUpField, setSignUpField] = useState({
    channelName: "",
    username: "",
    password: "",
    about: "",
    profileImage: "",
  });
  console.log(signUpField);

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
            value={signUpField.channelName}
            onChange={(e) =>
              setSignUpField({ ...signUpField, channelName: e.target.value })
            }
            placeholder="Channel name"
          />
          <input
            type="text"
            value={signUpField.username}
            onChange={(e) =>
              setSignUpField({ ...signUpField, username: e.target.value })
            }
            placeholder="Username"
          />
          <input
            type="password"
            value={signUpField.password}
            onChange={(e) =>
              setSignUpField({ ...signUpField, password: e.target.value })
            }
            placeholder="Password"
          />

          <textarea
            value={signUpField.about}
            onChange={(e) =>
              setSignUpField({ ...signUpField, about: e.target.value })
            }
            placeholder="About your channel"
            rows={3}
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
              Upload profile picture
              <input
                type="file"
                accept="image/*"
                hidden
                value={signUpField.profileImage}
                onChange={(e) => {
                  handleImageChange(e);
                  setSignUpField({
                    ...signUpField,
                    profileImage: e.target.value,
                  });
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
