import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import googleImg from '../assets/google.png';
import "../styles/auth.css";

const AuthPage: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const fadeVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return setLoginError("Please fill in all fields.");
    }
    if (!isValidEmail(loginData.email)) {
      return setLoginError("Enter a valid email address.");
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err: any) {
      setLoginError(err.message);
      setSignupError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupData.username || !signupData.email || !signupData.password) {
      return setSignupError("Please fill in all fields.");
    }
    if (!isValidEmail(signupData.email)) {
      return setSignupError("Enter a valid email address.");
    }
    if (signupData.password.length < 6) {
      return setSignupError("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setIsFlipped(false);
    } catch (err: any) {
      setSignupError(err.message);
      setLoginError(null);
    } finally {
      setLoading(false);
    }
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
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="you@bitbloom.dev"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                  setLoginError(null);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                  setLoginError(null);
                }}
              />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {loginError && <p className="text-danger text-center mt-3">{loginError}</p>}
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
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label htmlFor="signup-name">Name</label>
              <input
                type="text"
                id="signup-name"
                placeholder="BitBloomer"
                value={signupData.username}
                onChange={(e) => {
                  setSignupData({ ...signupData, username: e.target.value });
                  setSignupError(null);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                placeholder="you@bitbloom.dev"
                value={signupData.email}
                onChange={(e) => {
                  setSignupData({ ...signupData, email: e.target.value });
                  setSignupError(null);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) => {
                  setSignupData({ ...signupData, password: e.target.value });
                  setSignupError(null);
                }}
              />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
          {signupError && <p className="text-danger text-center mt-3">{signupError}</p>}
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
