import React, { useEffect, useState } from 'react'
import './login.css'

const Login = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Lock scroll + ESC close
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 220) // ⬅️ match CSS exit animation
  }

  return (
    <div
      className={`loginOverlay ${isClosing ? 'fadeOut' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`loginModal ${isClosing ? 'scaleOut' : ''}`}
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
          <input type="text" placeholder="Username or email" />
          <input type="password" placeholder="Password" />

          {/* ✅ REMEMBER ME */}
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
          <button className="loginPrimary">Sign in</button>
          <button className="loginSecondary">Create account</button>
        </div>
      </div>
    </div>
  )
}

export default Login
