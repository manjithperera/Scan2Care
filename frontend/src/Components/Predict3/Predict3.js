import React from "react";
import styles from "./Predict3.module.css"; // Ensure you have the correct CSS file

const Questionnaire = () => {
  return (
    <div className={styles.questionnaire_container}>
      {/* Header Section */}
      <div className={styles.header_section}>
        <img
          className={styles.user_image}
          src="/images/face-symptoms.png" // Replace with actual image path
          alt="User with skin condition"
        />
        <div className={styles.header_text}>
          <h2>Understand Your Skin Better with AI-Powered Insights</h2>
          <div className={styles.progress_dots}>
            <span className={styles.dot.active}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className={styles.progress_bar}>
        <div className={styles.progress_step.completed}>✔ Symptoms</div>
        <div className={styles.progress_line}></div>
        <div className={styles.progress_step.completed}>✔ Images</div>
        <div className={styles.progress_line}></div>
        <div className={styles.progress_step.active}>03 Questionnaire</div>
      </div>

      {/* Instruction */}
      <p className={styles.instruction}>
        Based on your symptoms, we'll ask a few targeted questions to refine the diagnosis. Your responses help us provide tailored insights.
      </p>

      {/* Form Fields */}
<div className={styles.form_container}>
  <label>Do You Experience Any Pain, Itching, Or Discomfort In The Affected Area?</label>
  <select>
    <option value="">Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>

  <label>Have You Had Similar Symptoms In The Past?</label>
  <select>
    <option value="">Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>

  <label>Do You Have Any Known Skin Allergies Or Conditions?</label>
  <select>
    <option value="">Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>

  <label>Have You Used Any Treatments Or Remedies On The Affected Area?</label>
  <select>
    <option value="">Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>

  <label>Have You Been Exposed To Excessive Sunlight Or Tanning Beds Recently?</label>
  <select>
    <option value="">Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</div>

      {/* Navigation Buttons */}
      <div className={styles.button_container}>
        <button className={styles.back_button}>BACK</button>
        <button className={styles.next_button}>NEXT</button>
      </div>
    </div>
  );
};

export default Questionnaire;
