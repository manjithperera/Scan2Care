import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const normalizeUserData = (user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      doctor_id: user.doctor_id ?? null,
      patient_id: user.patient_id ?? null,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, userType, password };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        const normalized = normalizeUserData(result.user);
        dispatch(setUser(normalized));
        navigate(userType === "doctor" ? "/dhome" : "/home");
      } else if (response.status === 409) {
        setErrorMessage(result.error || "An error occurred");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setGoogleUser(decoded);
      setShowPopup(true);
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const handleUserTypeConfirm = async () => {
    if (!googleUser || !userType) return;

    const userData = {
      name: googleUser.name,
      email: googleUser.email,
      userType,
      password: "google-oauth",
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok || response.status === 409) {
        const normalized = normalizeUserData(result.user);
        dispatch(setUser(normalized));
        setShowPopup(false);
        navigate(userType === "doctor" ? "/dhome" : "/home");
      } else {
        console.error("Google registration failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="854577512142-3l0qe0gt6u9d9ef3dr642f15r3tfcapl.apps.googleusercontent.com">
      <div className="signup-page-container">
        <div className="signup-left-section">
          <img src="../images/healthcare-workers-medicine-covid-19-pandemic-self-quarantine-concept-smiling-attractive-doctor-scrubs-glasses-stethoscope-neck-cross-arms-chest-ready-help-patients.png" alt="Doctor" className="signup-image" />
        </div>

        <div className="signup-right-section">
          <div className="signup-form-wrapper">
            <div className="signup-logo">
              <img src="/images/logo.png" alt="Logo" />
            </div>
            <h2 className="signup-title">Welcome</h2>
            <p className="signup-subtitle">Provide info to finalize your account.</p>

            <form onSubmit={handleSubmit} className="signup-form">
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="signup-input"
              />
              <input
                type="email"
                placeholder="Enter Your Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input"
              />
              <select
                required
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="signup-select"
              >
                <option value="" disabled>Select User Type</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
              />
              <button type="submit" className="signup-submit-button">SIGN UP</button>
            </form>

            {errorMessage && <p className="signup-error-message">{errorMessage}</p>}

            <div className="signup-or-divider">
              <p>OR</p>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error("Google Sign Up Failed")}
              />
            </div>

            <p className="signup-login-link">
              Already have an account? <Link to="/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="signup-modal-overlay">
          <div className="signup-modal-content">
            <h3 className="signup-modal-title">Select User Type</h3>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="signup-modal-select"
            >
              <option value="">Choose one</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
            <button
              onClick={handleUserTypeConfirm}
              disabled={!userType}
              className="signup-modal-button"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </GoogleOAuthProvider>
  );
};

export default SignUp;
