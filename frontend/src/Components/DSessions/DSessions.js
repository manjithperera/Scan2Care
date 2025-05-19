import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./DSessions.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";


const DSessions = () => {
  const [activeTab, setActiveTab] = useState("my");
  const [sessionsData, setSessionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const doctorId = useSelector((state) => state.user.doctorId);
  

 useEffect(() => {
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/get_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor_id: doctorId }),
      });
      const data = await response.json();
      if (response.ok) {
        setSessionsData(data.sessions);
      } else {
        setError(data.error || "Failed to load sessions.");
      }
    } catch (err) {
      setError("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  if (doctorId) {
    fetchSessions();
  }
}, [doctorId]);


  // Filter for logged-in doctor's sessions
  const mySessions = sessionsData.filter(session => session.doctor_id === doctorId);

  return (
    <div className="DSessions-container">
      <div className="DSessions-tabs">
        <span
          className={`DSessions-tab ${activeTab === "my" ? "DSessions-active" : ""}`}
          onClick={() => setActiveTab("my")}
        >
          My Sessions
        </span>
        <span
          className={`DSessions-tab ${activeTab === "booked" ? "DSessions-active" : ""}`}
          onClick={() => setActiveTab("booked")}
        >
          Booked Sessions
        </span>
      </div>

      {loading ? (
        <p className="DSessions-loading">Loading sessions...</p>
      ) : error ? (
        <p className="DSessions-error">{error}</p>
      ) : (
        <div className="DSessions-grid">
          {(activeTab === "my" ? mySessions : []).length === 0 ? (
            <p>No {activeTab === "my" ? "my sessions" : "booked sessions"} found.</p>
          ) : (
            (activeTab === "my" ? mySessions : []).map((session, index) => (
              <div key={session._id || index} className="DSessions-card">
                <div className="DSessions-info">
                  <p className="DSessions-number">Session {index + 1}</p>
                  <h4 className="DSessions-name">{session.doctor_name}</h4>
                  <p className="DSessions-specialization">{session.specialization}</p>
                  <p className="DSessions-qualifications">{session.qualifications}</p>
                  <div className="DSessions-datetime">
                    <FaCalendarAlt className="DSessions-icon" />
                    <span>{session.date}</span>
                  </div>
                  <div className="DSessions-datetime">
                    <FaClock className="DSessions-icon" />
                    <span>{session.time}</span>
                  </div>
                  <p className="DSessions-fee">Fee: {session.fee}</p>
                </div>
                {session.doctor_image_base64 ? (
                  <img
                    src={`data:image/png;base64,${session.doctor_image_base64}`}
                    alt="doctor"
                    className="DSessions-image"
                  />
                ) : (
                  <img
                    src="/doctor-placeholder.png"
                    alt="doctor"
                    className="DSessions-image"
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DSessions;
