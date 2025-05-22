import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./DSessions.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const DSessions = () => {
  const [activeTab, setActiveTab] = useState("my");
  const [mySessions, setMySessions] = useState([]);
  const [bookedSessions, setBookedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const doctorId = useSelector((state) => state.user.doctorId);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        // Fetch doctor’s created sessions
        const myRes = await fetch("http://localhost:5000/get_sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doctor_id: doctorId }),
        });
        const myData = await myRes.json();

        // Fetch sessions booked by patients for this doctor
        const bookedRes = await fetch(`http://localhost:5000/get_bookings_by_doctor/${doctorId}`);
        const bookedData = await bookedRes.json();

        if (myRes.ok && bookedRes.ok) {
          setMySessions(myData.sessions || []);
          setBookedSessions(bookedData.sessions || []);
        } else {
          setError(myData.error || bookedData.error || "Failed to load sessions.");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) fetchSessions();
  }, [doctorId]);

  const displayedSessions = activeTab === "my" ? mySessions : bookedSessions;

  return (
    <div>
      <Navbar />
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
            {displayedSessions.length === 0 ? (
              <p>No {activeTab === "my" ? "created" : "booked"} sessions found.</p>
            ) : (
              displayedSessions.map((session, index) => (
                <div key={index} className="DSessions-card">
                  <div className="DSessions-info">
                    <p className="DSessions-number">Session {index + 1}</p>
                    <h4 className="DSessions-name">{session.doctor_name || session.name}</h4>
                    <p className="DSessions-specialization">{session.specialization || session.specialty}</p>
                    <p className="DSessions-qualifications">{session.qualifications}</p>
                    <div className="DSessions-datetime">
                      <FaCalendarAlt className="DSessions-icon" />
                      <span>{session.date}</span>
                    </div>
                    <div className="DSessions-datetime">
                      <FaClock className="DSessions-icon" />
                      <span>{session.time}</span>
                    </div>
                    {session.fee && <p className="DSessions-fee">Fee: {session.fee}</p>}
                  </div>
                  {session.doctor_image_base64 ? (
                    <img
                      src={`data:image/png;base64,${session.doctor_image_base64}`}
                      alt="doctor"
                      className="DSessions-image"
                    />
                  ) : (
                    <img src="/doctor-placeholder.png" alt="doctor" className="DSessions-image" />
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DSessions;
