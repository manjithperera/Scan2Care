import React, { useEffect, useState } from "react";
import "./USessions.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";

const USessions = () => {
  const [sessions, setSessions] = useState([]);
  const user = useSelector((state) => state.user);
  const patientId = user?.patientId;

  useEffect(() => {
    const fetchSessions = async () => {
      if (!patientId) return;

      try {
        const response = await fetch(`http://localhost:5000/get_booked_sessions/${patientId}`);
        const data = await response.json();
        if (response.ok) {
          setSessions(data.sessions);
        } else {
          console.error("Error fetching sessions:", data.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchSessions();
  }, [patientId]);

  return (
    <div>
      <Navbar />
      <div className="USessions-container">
        <div className="USessions-left">
          <h2 className="USessions-title">My Sessions</h2>
          <div className="USessions-list">
            {sessions.map((session, index) => (
              <div className="USessions-card" key={index}>
                <h4>{session.name}</h4>
                <p>{session.specialty}</p>
                <p>{session.qualifications}</p>
                {session.date && session.time && (
                  <div className="USessions-datetime">
                    <span className="USessions-icon">📅</span>
                    <span>{session.date}</span>
                    <span className="USessions-icon" style={{ marginLeft: "12px" }}>🕒</span>
                    <span>{session.time}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="USessions-right">
          <img src="/images/Frame 3592.png" alt="Doctor" className="USessions-image" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default USessions;
