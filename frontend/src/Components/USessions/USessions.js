import React from "react";
import "./USessions.css";
// Replace with correct image path

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
    date: "",
    time: "",
  },
];

const USessions = () => {
  return (
    <div className="USessions-container">
      <div className="USessions-left">
        <h2 className="USessions-title">My Session</h2>
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
                  <span className="USessions-icon" style={{ marginLeft: "12px" }}>
                    🕒
                  </span>
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
  );
};

export default USessions;
