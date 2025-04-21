import React, { useState } from "react";
import { motion } from "framer-motion";
import googleImg from '../assets/google.png';;
import "../styles/auth.css";

const AuthPage: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const fadeVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="auth-container"
      variants={fadeVariant}
      initial="hidden"
      animate="visible"
    >
      <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
        {/* Login Side */}
        <div className="card-face front">
          <h2>Login to BitBloom</h2>
          <form>
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="you@bitbloom.dev"
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
          <div className="divider">or</div>
          <button className="google-button">
          <img src={googleImg} alt="Google" className="google-icon" />
            Continue with Google
          </button>
          <p className="toggle-text">
            New to BitBloom?{" "}
            <span onClick={toggleFlip} className="toggle-link">
              Create an account
            </span>
          </p>
        </div>

        {/* Signup Side */}
        <div className="card-face back">
          <h2>Join BitBloom</h2>
          <form>
            <div className="input-group">
              <label htmlFor="signup-name">Name</label>
              <input type="text" id="signup-name" placeholder="BitBloomer" />
            </div>
            <div className="input-group">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                placeholder="you@bitbloom.dev"
              />
            </div>
            <div className="input-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="auth-button">
              Signup
            </button>
          </form>
          <div className="divider">or</div>
          <button className="google-button">
            <img src={googleImg} alt="Google" className="google-icon" />
            Sign up with Google
          </button>
          <p className="toggle-text">
            Already a member?{" "}
            <span onClick={toggleFlip} className="toggle-link">
              Login
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthPage;
