import React, { useState, useEffect } from "react";
import "./DSessions.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const DSessions = () => {
  const [activeTab, setActiveTab] = useState("my");
  const [sessionsData, setSessionsData] = useState([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_sessions");
        const data = await response.json();
        if (response.ok) {
          setSessionsData(data.sessions);
        } else {
          console.error("Error fetching sessions:", data.error);
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="DSessions-container">
      <div className="DSessions-tabs">
        <span
          className={`DSessions-tab ${activeTab === "my" ? "DSessions-active" : ""}`}
          onClick={() => setActiveTab("my")}
        >
          My Session
        </span>
        <span
          className={`DSessions-tab ${activeTab === "booked" ? "DSessions-active" : ""}`}
          onClick={() => setActiveTab("booked")}
        >
          Booked sessions
        </span>
      </div>

      {loading ? (
        <p className="DSessions-loading">Loading sessions...</p>
      ) : (
        <div className="DSessions-grid">
          {sessionsData.length === 0 ? (
            <p>No sessions found.</p>
          ) : (
            sessionsData.map((session, index) => (
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
