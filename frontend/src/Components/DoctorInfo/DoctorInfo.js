import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DoctorInfo.css'; // Assuming CSS is also updated below

const DoctorBooking = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="doctor-booking-wrapper">
      {/* Header Image */}
      <div className="doctor-booking-header-img">
        <img
          src="https://via.placeholder.com/1200x300?text=Doctor+Team"
          alt="Doctors Group"
        />
      </div>

      {/* Title */}
      <h2 className="doctor-booking-title">DOCTORS INFORMATION</h2>

      <div className="doctor-booking-main">
        {/* Left Panel */}
        <div className="doctor-booking-left">
          <img
            src="https://via.placeholder.com/120x120.png?text=Doctor"
            alt="Doctor"
            className="doctor-booking-doctor-img"
          />
          <h3 className="doctor-booking-doctor-name">Dr. Safraz Hasan</h3>
          <p className="doctor-booking-doctor-qual">MBBS.MD (Pediatrics)</p>
          <span className="doctor-booking-specialty-tag">
            General Practitioner Specialist
          </span>
          <p className="doctor-booking-fee">4900 LKR</p>

          <div className="doctor-booking-about">
            <p className="doctor-booking-about-title">About Doctor</p>
            <p>
              Dr. Safraz Hasan is a board-certified dermatologist with extensive experience in diagnosing
              and treating various skin conditions, including eczema, psoriasis, acne, and skin cancers.
            </p>
            <p className="doctor-booking-about-text">
              He’s known for a compassionate approach, tailored treatments, and involvement in research and education.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="doctor-booking-right">
          <div className="doctor-booking-calendar-box">
            <Calendar
              onChange={setDate}
              value={date}
              className="doctor-booking-calendar"
            />
          </div>

          <div className="doctor-booking-time-section">
            <p>Select Time</p>
            <div className="doctor-booking-time-buttons">
              <button
                onClick={() => setSelectedTime("8.30 - 10.00 AM")}
                className={`doctor-booking-time-btn ${
                  selectedTime === "8.30 - 10.00 AM" ? 'doctor-booking-time-btn-active' : ''
                }`}
              >
                8.30 – 10.00 AM
              </button>
              <button
                onClick={() => setSelectedTime("10.00 - 12.00 AM")}
                className={`doctor-booking-time-btn ${
                  selectedTime === "10.00 - 12.00 AM" ? 'doctor-booking-time-btn-active' : ''
                }`}
              >
                10.00 – 12.00 AM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="doctor-booking-footer">
        <button className="doctor-booking-btn">BOOK NOW</button>
      </div>
    </div>
  );
};

export default DoctorBooking;
