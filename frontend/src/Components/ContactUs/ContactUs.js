import React from "react";
import "./ContactUs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <Navbar />

      {/* Contact Section */}
      <section className="contact-us-section">
        <div className="contact-us-left">
          <div className="contact-us-blue-bg"></div>
          <img
            src="/images/healthcare-workers-medicine-covid-19-pandemic-self-quarantine-concept-smiling-attractive-doctor-scrubs-glasses-stethoscope-neck-cross-arms-chest-ready-help-patients.png"
            alt="Doctor"
            className="contact-us-doctor-image"
          />
        </div>
        <div className="contact-us-right">
          <div className="contact-us-form-container">
            <div className="contact-us-form-header">
              <img src="./images/logo.png" alt="Logo Icon" />
              <h2>Contact Us</h2>
              <p>
                Contact us for expert skin cancer detection and personalized
                support on your skin health journey.
              </p>
            </div>
            <form className="contact-us-form">
            <label htmlFor="fullName">Full Name</label>
              <input type="text" required />
            <label htmlFor="email">Email</label>
              <input type="email" required />
            <label htmlFor="message">Message</label>
              <textarea rows="4" required></textarea>
              <button type="submit">SUBMIT</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;