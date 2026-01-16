import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const Login = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [loginField, setLoginField] = useState({
    username: "",
    password: "",
  });

  // Lock scroll + ESC close
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 220); // match CSS exit animation
  };

  const handleOnChangeInput = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  // 🔐 BACKEND LOGIN
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", loginField);

      // Store JWT
      localStorage.setItem("token", res.data.token);

      // Remember me flag (optional future use)
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className={`loginOverlay ${isClosing ? "fadeOut" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`loginModal ${isClosing ? "scaleOut" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="loginHeader">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
          />
          <h2>Sign in</h2>
        </div>

        <div className="loginBody">
          <input
            type="text"
            value={loginField.username}
            onChange={(e) => handleOnChangeInput(e, "username")}
            placeholder="Username or email"
          />

          <input
            type="password"
            value={loginField.password}
            onChange={(e) => handleOnChangeInput(e, "password")}
            placeholder="Password"
          />

          {/* Remember me */}
          <label className="rememberRow">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span>Remember me</span>
          </label>
        </div>

        <div className="loginActions">
          <button className="loginPrimary" onClick={handleLogin}>
            Sign in
          </button>

          <button
            className="loginSecondary"
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => {
                onClose();
                navigate("/signup");
              }, 220);
            }}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
