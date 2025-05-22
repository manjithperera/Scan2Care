import React, { useState } from "react";
import styles from "./Predict3.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Questionnaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uploadedFiles } = location.state || { uploadedFiles: [] };

  const [form, setForm] = useState({
    pain: "",
    pastSymptoms: "",
    allergies: "",
    treatments: "",
    sunlight: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!uploadedFiles.length) {
      alert("No images uploaded.");
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("files", file);
    });

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("✅ Prediction response:", data);

      // Validate predictions structure
      if (
        Array.isArray(data.predictions) &&
        data.predictions.length > 0 &&
        data.predictions[0].predicted_class
      ) {
        navigate("/predict4", { state: { predictions: data.predictions } });
      } else {
        alert("Prediction failed or incomplete. Please try again.");
      }
    } catch (err) {
      console.error("❌ Prediction error:", err);
      alert("Something went wrong during prediction.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.questionnaire_container}>
        <div className={styles.header_section}>
          <img className={styles.user_image} src="/images/Frame 3589.png" alt="User" />
          <div className={styles.header_text}>
            <h2>Understand Your Skin Better with AI-Powered Insights</h2>
            <div className={styles.progress_dots}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot_active}></span>
            </div>
          </div>
        </div>

        <div className={styles.progress_bar}>
          <div className={styles.progress_step.completed}>✔ Symptoms</div>
          <div className={styles.progress_line}></div>
          <div className={styles.progress_step.completed}>✔ Images</div>
          <div className={styles.progress_line}></div>
          <div className={styles.progress_step.active}>03 Questionnaire</div>
        </div>

        <p className={styles.instruction}>Answer the following questions:</p>

        <div className={styles.form_container}>
          {[
            { label: "Do You Experience Any Pain, Itching, Or Discomfort In The Affected Area?", name: "pain" },
            { label: "Have You Had Similar Symptoms In The Past?", name: "pastSymptoms" },
            { label: "Do You Have Any Known Skin Allergies Or Conditions?", name: "allergies" },
            { label: "Have You Used Any Treatments Or Remedies On The Affected Area?", name: "treatments" },
            { label: "Have You Been Exposed To Excessive Sunlight Or Tanning Beds Recently?", name: "sunlight" }
          ].map(({ label, name }) => (
            <div key={name}>
              <label>{label}</label>
              <select name={name} onChange={handleChange} value={form[name]}>
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          ))}
        </div>

        <div className={styles.button_container}>
          <button className={styles.back_button} onClick={() => navigate("/predict2")}>BACK</button>
          <button className={styles.next_button} onClick={handleSubmit}>NEXT</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Questionnaire;
