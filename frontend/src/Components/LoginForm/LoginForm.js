import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          _id: data.user?._id ?? data.user?.user_id,
          doctor_id: data.user?.doctor_id ?? null,
          patient_id: data.user?.patient_id ?? null,
          name: data.user?.name,
          email: data.user?.email,
          user_type: data.user?.user_type,
        };

        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));

        navigate(user.user_type === "doctor" ? "/dhome" : "/home");
      } else {
        setError(data.error || "Login failed");
        alert("Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await fetch("http://localhost:5000/google_login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: decoded.name,
          email: decoded.email,
          userType: "patient", // default for Google users
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          _id: data.user?._id ?? data.user?.user_id,
          doctor_id: data.user?.doctor_id ?? null,
          patient_id: data.user?.patient_id ?? null,
          name: data.user?.name,
          email: data.user?.email,
          user_type: data.user?.user_type,
        };

        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        navigate(user.user_type === "doctor" ? "/dhome" : "/home");
      } else {
        setError(data.error || "Google Sign-In failed");
      }
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
