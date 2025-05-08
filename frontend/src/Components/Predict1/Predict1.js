import React, { useState } from "react";
import styles from './Predict1.module.css'

const SymptomsStep = () => {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div className={styles.symptoms_container}>
      {/* ✅ Static Header Section */}
      <div className={styles.header_section}>
        <div className={styles.header_image}>
          <img
            src="https://via.placeholder.com/300x200"
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
        <button className={styles.back_button}>Back</button>
        <button className={styles.next_button}>Next</button>
      </div>
    </div>
  );
};

export default SymptomsStep;
