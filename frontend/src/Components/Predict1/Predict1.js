import React, { useState } from "react";
import styles from './Predict1.module.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Link} from 'react-router-dom';

const SymptomsStep = () => {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div>
      <Navbar />
    <div className={styles.symptoms_container}>
      {/* ✅ Static Header Section */}
      <div className={styles.header_section}>
        <div className={styles.header_image}>
          <img
            src="/images/Group 1000002611 copy.png"
            alt="User with Skin Condition"
          />
        </div>
        <div className={styles.header_text}>
          <h2>Understand Your Skin Better with AI-Powered Insights</h2>
          <div className="dots">
            <span className={styles.dot} active></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>

      {/* ✅ Progress Bar */}
      <div className={styles.progress_bar}>
        <div className={styles.progress_step.active}>
          <span className={styles.step_number}>01</span> Symptoms
        </div>
        <div className={styles.progress_line}></div>
        <div className={styles.progress_step}>
          <span className={styles.step_number}>02</span> Images
        </div>
        <div className={styles.progress_line}></div>
        <div className={styles.progress_step}>
          <span className={styles.step_number}>03</span> Questionnaire
        </div>
      </div>

      {/* ✅ Symptoms Input Section */}
      <div className={styles.symptoms_input_container}>
        <p>Enter symptoms that are currently occurring:</p>
        <textarea
          className={styles.symptoms_input}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Type here..."
        ></textarea>
      </div>

      {/* ✅ Navigation Buttons */}
      <div className={styles.button_container}>
        <Link to="/Home"><button className={styles.back_button}>Back</button></Link>
        <Link to="/Predict2"><button className={styles.next_button}>Next</button></Link>
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default SymptomsStep;
