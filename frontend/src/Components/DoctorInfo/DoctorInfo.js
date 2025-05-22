import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DoctorInfo.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";

const DoctorInfo = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate(); // ✅ navigation hook
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [sessionDates, setSessionDates] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const user = useSelector((state) => state.user);
  const patientId = user?.patientId;

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get_doctor_info/${doctorId}`);
        const data = await response.json();
        if (response.ok) {
          setDoctor(data.doctor);
        } else {
          console.error("Error fetching doctor:", data.error);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        setLoadingTimes(true);
        const formattedDate = formatDate(date);
        const response = await fetch("http://localhost:5000/get_times_by_date", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: formattedDate }),
        });
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          const matchingSessions = data.filter(
            (session) => String(session.doctor_id).trim() === String(doctorId).trim()
          );
          const times = matchingSessions.flatMap((session) => {
            if (typeof session.time === "string") {
              return session.time.split(",").map((t) => t.trim()).filter(Boolean);
            } else if (Array.isArray(session.time)) {
              return session.time.map((t) => t.trim()).filter(Boolean);
            }
            return [];
          });
          setAvailableTimes(times);
        } else {
          setAvailableTimes([]);
        }
      } catch (error) {
        console.error("Error fetching time slots:", error);
        setAvailableTimes([]);
      } finally {
        setLoadingTimes(false);
      }
    };
    fetchTimes();
  }, [date, doctorId]);

  useEffect(() => {
    const fetchAllDoctorSessionDates = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_all_sessions");
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          const doctorSessions = data.filter(
            (session) => String(session.doctor_id).trim() === String(doctorId).trim()
          );
          const uniqueDates = [...new Set(doctorSessions.map((s) => s.date))];
          setSessionDates(uniqueDates);
        } else {
          console.error("Error fetching sessions:", data.error);
        }
      } catch (error) {
        console.error("Error fetching session dates:", error);
      }
    };
    fetchAllDoctorSessionDates();
  }, [doctorId]);

  const handleBooking = async () => {
    if (!patientId) {
      alert("User not logged in as patient.");
      return;
    }

    const payload = {
      patient_id: patientId,
      doctor_id: doctorId,
      date: formatDate(date),
      time: selectedTime,
    };

    try {
      const response = await fetch("http://localhost:5000/book_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Booking confirmed!");
        navigate("/usessions"); // ✅ redirect to USessions page
      } else {
        alert("Booking failed: " + data.error);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred during booking.");
    }
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="doctor-booking-wrapper">
        <div className="doctor-booking-header-img">
          <img src="/images/Frame 3591.png" alt="Doctors Group" />
        </div>
        <h2 className="doctor-booking-title">DOCTOR INFORMATION</h2>
        <div className="doctor-booking-main">
          <div className="doctor-booking-left">
            {doctor.image_base64 ? (
              <img
                src={`data:image/png;base64,${doctor.image_base64}`}
                alt={doctor.doctor_name}
                className="doctor-booking-doctor-img"
              />
            ) : (
              <div className="doctor-booking-image-placeholder">No Image</div>
            )}
            <h3 className="doctor-booking-doctor-name">{doctor.doctor_name}</h3>
            <p className="doctor-booking-doctor-qual">{doctor.qualifications}</p>
            <span className="doctor-booking-specialty-tag">{doctor.specialization}</span>
            <p className="doctor-booking-fee">{doctor.fee} LKR</p>
            <div className="doctor-booking-about">
              <p className="doctor-booking-about-title">About Doctor</p>
              <p>{doctor.summary}</p>
            </div>
          </div>
          <div className="doctor-booking-right">
            <div className="doctor-booking-calendar-box">
              <Calendar
                onChange={(newDate) => {
                  setDate(newDate);
                  setSelectedTime(null);
                }}
                value={date}
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const formatted = formatDate(date);
                    if (sessionDates.includes(formatted)) {
                      return "highlighted-date";
                    }
                  }
                  return null;
                }}
                className="doctor-booking-calendar"
              />
            </div>
            <div className="doctor-booking-time-section">
              <p>Select Time for {formatDate(date)}</p>
              {loadingTimes ? (
                <p>Loading available times...</p>
              ) : availableTimes.length > 0 ? (
                <div className="doctor-booking-time-buttons">
                  {availableTimes.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`doctor-booking-time-btn ${
                        selectedTime === time ? "doctor-booking-time-btn-active" : ""
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="no-times">No available times on this date.</p>
              )}
            </div>
          </div>
        </div>
        <div className="doctor-booking-footer">
          <button
            className="doctor-booking-btn"
            disabled={!selectedTime}
            onClick={handleBooking}
          >
            BOOK NOW
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorInfo;
