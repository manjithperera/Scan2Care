# Scan2Care

# 🧬 Skin Cancer Detection & Doctor Session Management Application

## 📝 Overview
This is a full-stack web application built to **empower users** in early skin cancer detection and **connect patients with dermatologists** for consultation. It combines **deep learning**-based image classification with a **session management system**, streamlining both diagnosis and treatment workflows.

---

## 🌟 Features

### 👤 User (Patient) Side
- **User Registration & Login:** Manual signup and Google OAuth 2.0 for secure authentication.
- **Skin Cancer Prediction:** Upload lesion images and receive AI-driven predictions (e.g., ACC, BCC, Melanoma).
- **Book Sessions:** Browse available doctor sessions and make appointments.
- **My Bookings:** View all your past and upcoming consultation sessions.

### 🩺 Doctor Side
- **Doctor Signup/Login:** Secure access via manual or Google OAuth 2.0.
- **Manage Sessions:** Create sessions by specifying date, time, and session details.
- **View Bookings:** Doctors can review all booked patient appointments.

### 🛠️ Admin / Backend
- **RESTful API:** Built with Flask and connected to MongoDB for data storage.
- **Deep Learning Integration:** Uses a TensorFlow model for accurate skin cancer classification.
- **Image Upload Support:** Handles image storage for both predictions and doctor profiles.
- **Real-time Booking System:** Validates session availability during booking.

---

## 🧰 Technologies Used

| Layer        | Technologies                            |
|--------------|------------------------------------------|
| **Frontend** | React.js, React Router, Redux            |
| **Backend**  | Python Flask, Flask-CORS                 |
| **Database** | MongoDB (NoSQL document store)           |
| **Auth**     | Manual login & Google OAuth 2.0          |
| **ML Model** | TensorFlow/Keras                         |
| **Others**   | Axios, Node.js environment for frontend  |

---

## ⚙️ Installation & Setup

### 🔧 Backend Setup

```bash
git clone https://github.com/your-username/skin-cancer-detection.git
cd skin-cancer-detection/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate   # Linux/macOS
# OR
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Add environment variables (Mongo URI, Google OAuth keys)
# .env file or directly in app config

# Run Flask server
flask run

# 🧬 Skin Cancer Detection & Doctor Session Management Application

## 📝 Overview
This is a full-stack web application built to **empower users** in early skin cancer detection and **connect patients with dermatologists** for consultation. It combines **deep learning**-based image classification with a **session management system**, streamlining both diagnosis and treatment workflows.

---

## 🌟 Features

### 👤 User (Patient) Side
- **User Registration & Login:** Manual signup and Google OAuth 2.0 for secure authentication.
- **Skin Cancer Prediction:** Upload lesion images and receive AI-driven predictions (e.g., ACC, BCC, Melanoma).
- **Book Sessions:** Browse available doctor sessions and make appointments.
- **My Bookings:** View all your past and upcoming consultation sessions.

### 🩺 Doctor Side
- **Doctor Signup/Login:** Secure access via manual or Google OAuth 2.0.
- **Manage Sessions:** Create sessions by specifying date, time, and session details.
- **View Bookings:** Doctors can review all booked patient appointments.

### 🛠️ Admin / Backend
- **RESTful API:** Built with Flask and connected to MongoDB for data storage.
- **Deep Learning Integration:** Uses a TensorFlow model for accurate skin cancer classification.
- **Image Upload Support:** Handles image storage for both predictions and doctor profiles.
- **Real-time Booking System:** Validates session availability during booking.

---

## 🧰 Technologies Used

| Layer        | Technologies                            |
|--------------|------------------------------------------|
| **Frontend** | React.js, React Router, Redux            |
| **Backend**  | Python Flask, Flask-CORS                 |
| **Database** | MongoDB (NoSQL document store)           |
| **Auth**     | Manual login & Google OAuth 2.0          |
| **ML Model** | TensorFlow/Keras                         |
| **Others**   | Axios, Node.js environment for frontend  |

---

## ⚙️ Installation & Setup

### 🔧 Backend Setup

```bash
git clone https://github.com/your-username/skin-cancer-detection.git
cd skin-cancer-detection/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate   # Linux/macOS
# OR
venv\Scripts\activate      # Windows

# Install dependencies
pip install -r requirements.txt

# Add environment variables (Mongo URI, Google OAuth keys)
# .env file or directly in app config

# Run Flask server
flask run



## 💻 Frontend Setup
bash

cd ../frontend

# Install dependencies
npm install

# Start development server
npm start




Access the app at: http://localhost:3000

## 🚀 Usage Instructions
Register/Login as a user or doctor.

Patients can:

Upload skin images for cancer prediction

Book available consultation sessions

View their session history

Doctors can:

Create and manage session availability

View bookings made by patients

## 📁 Project Structure



skin-cancer-detection/
├── backend/             # Flask API and ML model
├── frontend/            # React client application
├── models/              # Trained TensorFlow model files
├── requirements.txt     # Python dependencies
└── package.json         # Frontend scripts and packages


## 🔮 Future Enhancements
 🎥 Video consultation support

 🔔 Appointment reminders via email/SMS

 📈 Improve model accuracy with expanded dataset

 🌍 Multilingual interface support

 💳 Integrate payment system for paid consultations

## 🙌 Acknowledgments

React.js

Flask

TensorFlow

MongoDB

Google OAuth

Special thanks to open-source contributors and the developer community.

## 📬 Contact
Developer: Manjith Perera
GitHub: https://github.com/manjithperera



