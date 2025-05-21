import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DoctorInfo.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const DoctorInfo = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
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
        const formattedDate = formatDate(date);
        const response = await fetch("http://localhost:5000/get_times_by_date", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: formattedDate }),
        });

        const data = await response.json();
        if (response.ok) {
          const matchingSessions = data.filter(
            (session) => session.doctor_id === doctorId
          );

          const times = matchingSessions.flatMap((session) =>
            session.time.split(",").map((t) => t.trim())
          );

          setAvailableTimes(times);
        } else {
          console.error("Error fetching time slots:", data.error);
        }
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };

    fetchTimes();
  }, [date, doctorId]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
    <div className="doctor-booking-wrapper">
      <div className="doctor-booking-header-img">
        <img src="/images/doctors-group.png" alt="Doctors Group" />
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
              className="doctor-booking-calendar"
            />
          </div>

          <div className="doctor-booking-time-section">
            <p>Select Time</p>
            <div className="doctor-booking-time-buttons">
              {availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
                    className={`doctor-booking-time-btn ${
                      selectedTime === time ? "doctor-booking-time-btn-active" : ""
                    }`}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p>No available times on this date.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="doctor-booking-footer">
        <button className="doctor-booking-btn" disabled={!selectedTime}>
          BOOK NOW
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default DoctorInfo;
