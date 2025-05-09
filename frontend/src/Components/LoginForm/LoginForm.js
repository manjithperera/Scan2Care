// src/components/LoginForm.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser, setDoctorId } from "../../redux/userSlice";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Manual login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password, userType };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(setUser(data.user));

        if (data.user.user_type === "doctor") {
          dispatch(setDoctorId(data.user._id)); // Save doctorId to Redux
          navigate("/dhome"); // Redirect to doctor's home
        } else {
          navigate("/home"); // Redirect to patient home
        }
      } else {
        setError(data.error || "Login failed");
        alert("Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // Google login handler
  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const user = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        user_type: "patient", // default to patient, change if needed
        login_method: "google",
      };

      dispatch(setUser(user)); // Set user info in Redux
      localStorage.setItem("user", JSON.stringify(user)); // Persist user in localStorage
      navigate("/home");
    } catch (err) {
      console.error("Google decode error:", err);
      setError("Google Sign-In Failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="854577512142-3l0qe0gt6u9d9ef3dr642f15r3tfcapl.apps.googleusercontent.com">
      <div className={styles.login_container}>
        <div className={styles.login_card}>
          <div className={styles.form_container}>
            <div className={styles.logo}>
              <img src="/images/logo.png" alt="Logo" />
            </div>
            <h2>Welcome</h2>
            <p>Please sign in to access your account</p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                required
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="" disabled>Select User Type</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>

              <div className={styles.form_options}>
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="/forgot-password">Forgot Password?</a>
              </div>

              <button type="submit">SIGN IN</button>
              {error && <p className={styles.error}>{error}</p>}
            </form>

            <div className={styles.google_login}>
              <p>OR</p>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setError("Google Sign-In Failed")}
              />
            </div>

            <p className={styles.signup_link}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>

        <div className={styles.image_container}>
          <img src="/images/Group 1000002621.png" alt="Doctor" />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
