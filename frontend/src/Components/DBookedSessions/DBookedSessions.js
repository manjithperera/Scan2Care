import React, { useState } from "react";
import "./DBookedSessions.css";

const sessions = [
  {
    name: "Dr. Sabith Salieh",
    specialty: "Psychiatrist",
    qualifications: "MBBS MD. DDS",
    date: "Mar.09, 2024",
    time: "13:00 pm",
  },
  {
    name: "Dr. Anura Perera",
    specialty: "Psychiatrist",
    qualifications: "MBBS MD. DDS",
    date: "Mar.09, 2024",
    time: "13:00 pm",
  },
  {
    name: "Dr. Kamal Gunaratna",
    specialty: "Psychiatrist",
    qualifications: "MBBS MD. DDS",
    date: "Mar.09, 2024",
    time: "13:00 pm",
  },
];

const DBookedSessions = () => {
  const [activeTab, setActiveTab] = useState("booked");

  return (
    <div className="DBookedSessions-container">
      <div className="DBookedSessions-left">
        <div className="DBookedSessions-tabs">
          <span
            className={`DBookedSessions-tab ${activeTab === "my" ? "active" : ""}`}
            onClick={() => setActiveTab("my")}
          >
            My Session
          </span>
          <span
            className={`DBookedSessions-tab ${activeTab === "booked" ? "active" : ""}`}
            onClick={() => setActiveTab("booked")}
          >
            Booked sessions
          </span>
        </div>

        <div className="DBookedSessions-scroll">
          <div className="DBookedSessions-line" />
          <div className="DBookedSessions-cards">
            {sessions.map((session, index) => (
              <div className="DBookedSessions-card" key={index}>
                <h4 className="DBookedSessions-name">{session.name}</h4>
                <p className="DBookedSessions-specialty">{session.specialty}</p>
                <p className="DBookedSessions-qualifications">{session.qualifications}</p>
                {session.date && session.time && (
                  <div className="DBookedSessions-datetime">
                    <span className="DBookedSessions-icon">📅</span>
                    <span>{session.date}</span>
                    <span className="DBookedSessions-icon" style={{ marginLeft: "12px" }}>🕒</span>
                    <span>{session.time}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="DBookedSessions-right">
        <img src="/images/doctor-right.png" alt="Doctor" className="DBookedSessions-image" />
      </div>
    </div>
  );
};

export default DBookedSessions;
