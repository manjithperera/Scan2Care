// App.js
import React from 'react';
import styles from './Home.module.css';


const App = () => {
  return (
    <div className={styles.btn_primary}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="hero-content">
          <h1>
            Revolutionizing <span className="highlight">Skin Disease</span> Detection with AI
          </h1>
          <p>
            Our advanced image-processing technology focuses on detecting and diagnosing skin
            diseases, offering accurate solutions tailored to prioritize your skin health.
          </p>
          <button className="btn-primary">Get Started</button>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2>Explore our comprehensive services at Scan2Care</h2>
        <div className={styles.services_grid}>
          <div className={styles.service_item}>
            <img src="/images/service1.png" alt="Service 1" />
            <p>Receive AI-powered risk analysis reports to identify potential skin concerns and get insights for treatment or prevention.</p>
          </div>
          <div className={styles.service_item}>
            <img src="/images/service2.png" alt="Service 2" />
            <p>Using advanced image processing, identify potential skin abnormalities with speed and precision.</p>
          </div>
          <div className={styles.service_item}>
            <img src="/images/service3.png" alt="Service 3" />
            <p>Access a wide range of useful tools for skin self-checks and connect with dermatology experts when needed.</p>
          </div>
          <div className={styles.service_item}>
            <img src="/images/service4.png" alt="Service 4" />
            <p>Our technology focuses on early detection of skin diseases to help minimize risks and maintain healthy skin.</p>
          </div>
        </div>
      </section>

      {/* Trusted Experts Section */}
      <section className={styles.experts}>
        <div className={styles.experts_content}>
          <img src="/images/doctor.png" alt="Doctor" />
          <div>
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
          <img src="/images/user.png" alt="User" />
        </div>
      </section>

      {/* Why Scan2Care Section */}
      <section className={styles.why_scan2care}>
        <h2>Why Scan2Care</h2>
        <div className={styles.why_grid}>
          <div className={styles.why_item}>
            <h3>User-Friendly Interface</h3>
            <p>
              Our platform is intuitive and simple to navigate, ensuring users can easily upload
              images, view reports, and access educational resources.
            </p>
          </div>
          <div className={styles.why_item}>
            <h3>Secure & Confidential Platform</h3>
            <p>
              Data privacy is our top priority. We ensure all user information remains confidential
              and secure at every stage of interaction.
            </p>
          </div>
          <div className={styles.why_item}>
            <h3>Comprehensive Skin Cancer Screening</h3>
            <p>
              Our services are designed to identify potential skin cancer risks, focusing on early
              detection to prioritize your health and peace of mind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
