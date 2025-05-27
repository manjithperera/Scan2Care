// App.js
import React from 'react';
import styles from './Home.module.css';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.btn_primary}>
        {/* Hero Section */}
        <section className={styles.hero}>
          {/* Image with Button and Overlay Image on Top */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <img
              src="/images/Group 1000002623.png"
              alt="Hero Visual"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Overlay Image */}
            <img
              src="/images/Frame 3589.png"
              alt="Overlay Icon"
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '350px',
                height: '300px',
                zIndex: 2,
                transform: 'translate(-340%, 210%)'

              }}
            />

            {/* Overlay Button */}
            <Link to="/Predict1">
              <button
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-375%, 295%)',
                  padding: '15x 25px',
                  backgroundColor: '#4682B4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                Get started
              </button>
            </Link>
          </div>

          {/* Hero Text */}
          <div style={{ textAlign: 'center' }}>
            <h1>
              Revolutionizing <span className="highlight">Skin Disease</span> Detection with AI
            </h1>
            <Link to="/Predict1">
              <button className="btn-primary">Get Started</button>
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.services}>
          <h2>Explore our comprehensive services at Scan2Care</h2>
          <div className={styles.services_grid}>
            <div className={styles.service_item}>
              <img src="/images/Group 1000002612aa.png" alt="Service 1" />
              <p>Receive AI-powered risk analysis reports to identify potential skin concerns and get insights for treatment or prevention.</p>
            </div>
            <div className={styles.service_item}>
              <img src="/images/Group 1000002613aa.png" alt="Service 2" />
              <p>Using advanced image processing, identify potential skin abnormalities with speed and precision.</p>
            </div>
            <div className={styles.service_item}>
              <img src="/images/Group 1000002614aa.png" alt="Service 3" />
              <p>Access a wide range of useful tools for skin self-checks and connect with dermatology experts when needed.</p>
            </div>
            <div className={styles.service_item}>
              <img src="/images/Group 1000002615aa.png" alt="Service 4" />
              <p>Our technology focuses on early detection of skin diseases to help minimize risks and maintain healthy skin.</p>
            </div>
          </div>
        </section>

        {/* Trusted Experts Section */}
<section className={styles.experts}>
  <div className={styles.experts_content}>
    <div className={styles.experts_image}>
      <img src="/images/Group 9.png" alt="Doctor" />
    </div>
    <div className={styles.experts_text}>
      <h2>Trusted by Dermatology Experts</h2>
      <p>
        Our detection system is validated and tested by leading dermatologists worldwide to
        ensure its reliability. We provide a trusted platform for detecting skin conditions
        accurately, ensuring early intervention when it matters the most.
      </p>
      <button className={styles.btn_secondary}>Learn More</button>
    </div>
  </div>
</section>


        {/* Empowering Users Section */}
        <section className={styles.empowering}>
  <div className={styles.empowering_content}>
    <div>
      <h2>Empowering Users with Knowledge</h2>
      <p>
        With detailed educational resources and risk assessment insights, our services empower
        users to take control of their skin health. From identifying skin anomalies to
        providing preventative recommendations, we help you make informed decisions.
      </p>
    </div>
    <img src="/images/Frame 67.png" alt="User" />
  </div>
</section>


        <section className={styles.why_scan2care}>
  <h2>Why Scan2Care</h2>
  <div className={styles.why_row}>
    <div className={styles.why_item}>
      <h3>User-Friendly Interface</h3>
      <p>
        Our platform ensures a seamless and straightforward experience for all users. From uploading your skin images to receiving detailed, easy-to-understand diagnostic reports, every step is designed to be intuitive and user-friendly. With a focus on accessibility, our platform empowers individuals of all ages and technical backgrounds to take control of their skin health effortlessly.
      </p>
    </div>
    <div className={styles.why_item}>
      <h3>Secure & Confidential Platform</h3>
      <p>
        We prioritize your privacy by ensuring that all images and data shared with us are securely encrypted and handled with strict confidentiality. Our robust security protocols safeguard your information at every stage, giving you peace of mind while using our platform. Trust and transparency are at the heart of our services, ensuring your sensitive data is protected at the highest standards.
      </p>
    </div>
    <div className={styles.why_item}>
      <h3>Comprehensive Skin Cancer Screening</h3>
      <p>
        Our system specializes in detecting skin cancers, including melanoma, basal cell carcinoma, and squamous cell carcinoma, with exceptional accuracy. By focusing on early detection, we empower users to take proactive measures, enabling timely medical intervention that significantly improves treatment outcomes and enhances the chances of recovery. With our technology, you can stay one step ahead in managing your skin health effectively.
      </p>
    </div>
  </div>
</section>

      </div>
      <Footer />
    </div>
  );
};

export default App;
