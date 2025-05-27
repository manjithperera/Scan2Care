from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64
from pymongo import MongoClient, DESCENDING
from bson.objectid import ObjectId
import bcrypt
from datetime import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True)


client = MongoClient("mongodb+srv://manjithperera66:GBcCSKrWirAG3XQC@cluster0.ojaltri.mongodb.net/?retryWrites=true&w=majority&tls=true")
users_db = client["users"]
collection = users_db["patients"]
doctor_collection = users_db["doctors"]
session_collection = users_db["doctor_sessions"]
booking_collection = users_db["bookings"]


model = load_model('./model/skin_cancer_combined_model.h5')
class_map = {0: "Basal Cell Carcinoma", 1: "Melanoma", 2: "Squamous Cell Carcinoma"}



def generate_doctor_id():
    last_doc = doctor_collection.find_one(
        {"doctor_id": {"$regex": "^D\\d+$"}},
        sort=[("doctor_id", DESCENDING)]
    )
    if last_doc and "doctor_id" in last_doc:
        last_id = int(last_doc["doctor_id"][1:])
        return f"D{last_id + 1:03d}"
    return "D001"


def generate_patient_id():
    last_patient = collection.find_one(
        {"patient_id": {"$regex": "^P\\d+$"}},
        sort=[("patient_id", DESCENDING)]
    )
    if last_patient and "patient_id" in last_patient:
        last_id = int(last_patient["patient_id"][1:])
        return f"P{last_id + 1:03d}"
    return "P001"


@app.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON or no data provided"}), 400

        name = data.get("name")
        email = data.get("email")
        user_type = data.get("userType")
        password = data.get("password")

        if not all([name, email, user_type, password]):
            return jsonify({"error": "All fields are required"}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        collection_ref = collection if user_type == "patient" else doctor_collection

        
        existing_user = collection_ref.find_one({"email": email})
        if existing_user:
            user_info = {
                "_id": str(existing_user.get("_id")),
                "name": existing_user.get("name"),
                "email": existing_user.get("email"),
                "user_type": existing_user.get("user_type"),
            }
            if user_type == "doctor":
                user_info["doctor_id"] = existing_user.get("doctor_id")
            else:
                user_info["patient_id"] = existing_user.get("patient_id") or str(existing_user.get("_id"))

            return jsonify({"error": "User already exists", "user": user_info}), 409

        
        user = {
            "name": name,
            "email": email,
            "user_type": user_type,
            "password": hashed_password,
        }

        if user_type == "doctor":
            user["doctor_id"] = generate_doctor_id()
        elif user_type == "patient":
            user["patient_id"] = generate_patient_id()

        inserted = collection_ref.insert_one(user)
        user["_id"] = inserted.inserted_id

        
        user_response = {
            "_id": str(user["_id"]),
            "name": name,
            "email": email,
            "user_type": user_type
        }
        if user_type == "doctor":
            user_response["doctor_id"] = user["doctor_id"]
        else:
            user_response["patient_id"] = user["patient_id"]

        return jsonify({"message": "User registered successfully", "user": user_response}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400





@app.route("/google_login", methods=["POST"])
def google_login():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        user_type = data.get("userType")

        if not all([name, email, user_type]):
            return jsonify({"error": "Fields name, email, and userType are required"}), 400

        collection_ref = collection if user_type == "patient" else doctor_collection
        user = collection_ref.find_one({"email": email})

        if not user:
            new_user = {
                "name": name,
                "email": email,
                "user_type": user_type
            }
            if user_type == "doctor":
                new_user["doctor_id"] = generate_doctor_id()

            inserted = collection_ref.insert_one(new_user)
            new_user["_id"] = inserted.inserted_id

            response_data = {
                "name": name,
                "email": email,
                "user_type": user_type
            }
            if user_type == "doctor":
                response_data["doctor_id"] = new_user["doctor_id"]
            else:
                response_data["user_id"] = str(new_user["_id"])

            return jsonify({"message": "Google sign-in successful (new user)", "user": response_data}), 201

        response_data = {
            "name": user["name"],
            "email": user["email"],
            "user_type": user["user_type"]
        }
        if user_type == "doctor":
            response_data["doctor_id"] = user["doctor_id"]
        else:
            response_data["user_id"] = str(user["_id"])

        return jsonify({"message": "Google sign-in successful", "user": response_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "files" not in request.files:
            return jsonify({"error": "No files uploaded"}), 400

        files = request.files.getlist("files")
        predictions = []

        def encode_answer(value):
            return 1 if value and value.lower() in ['yes', '1', 'true'] else 0

        user_symptoms = np.array([[  # shape (1, 5)
            encode_answer(request.form.get("pain")),
            encode_answer(request.form.get("pastSymptoms")),
            encode_answer(request.form.get("allergies")),
            encode_answer(request.form.get("treatments")),
            encode_answer(request.form.get("sunlight"))
        ]], dtype=np.float32)

        for file in files:
            img = Image.open(io.BytesIO(file.read())).resize((224, 224)).convert("RGB")
            img_array = np.array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)  # shape (1, 224, 224, 3)

            pred = model.predict({
                "image_input": img_array,
                "user_input": user_symptoms
            })

            class_index = int(np.argmax(pred))
            class_name = class_map.get(class_index, "Unknown")
            confidence = float(np.max(pred)) * 100
            class_probs = {class_map[i]: float(prob) * 100 for i, prob in enumerate(pred[0])}

            predictions.append({
                "predicted_class": class_name,
                "confidence": round(confidence, 2),
                "probabilities": class_probs
            })

        return jsonify({
            "predictions": predictions,
            "symptoms_used": {
                "pain": request.form.get("pain"),
                "pastSymptoms": request.form.get("pastSymptoms"),
                "allergies": request.form.get("allergies"),
                "treatments": request.form.get("treatments"),
                "sunlight": request.form.get("sunlight")
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/add_session", methods=["POST"])
def add_session():
    try:
        data = request.get_json()
        required_fields = ["doctor_name", "qualifications", "specialization", "hospital", "summary", "image", "time_slot", "fee", "date", "doctor_id"]
        if not all(field in data for field in required_fields):
            missing_fields = [field for field in required_fields if field not in data]
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        try:
            datetime.strptime(data["date"], "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

        doctor_id = data["doctor_id"]
        doctor = doctor_collection.find_one({"doctor_id": doctor_id})
        if not doctor:
            return jsonify({"error": "Doctor not found"}), 404

        doctor_collection.update_one(
            {"doctor_id": doctor_id},
            {"$set": {
                "specialization": data["specialization"],
                "qualifications": data["qualifications"],
                "hospital": data["hospital"],
                "summary": data["summary"],
                "image_binary": base64.b64decode(data["image"])
            }}
        )

        session = {
            "doctor_id": doctor_id,
            "doctor_name": data["doctor_name"],
            "specialization": data["specialization"],
            "qualifications": data["qualifications"],
            "date": data["date"],
            "time": data["time_slot"],
            "fee": data["fee"],
            "image_binary": base64.b64decode(data["image"])
        }

        session_collection.insert_one(session)
        return jsonify({"message": "Session added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/get_doctor_info/<doctor_id>", methods=["GET"])
def get_doctor_info(doctor_id):
    try:
        
        doctor = doctor_collection.find_one({"doctor_id": doctor_id})
        if not doctor:
            return jsonify({"error": "Doctor not found"}), 404

       
        image_base64 = base64.b64encode(doctor.get("image_binary", b"")).decode("utf-8") if doctor.get("image_binary") else None

        doctor_data = {
            "doctor_id": doctor.get("doctor_id", ""),
            "doctor_name": doctor.get("name", ""),
            "specialization": doctor.get("specialization", ""),
            "qualifications": doctor.get("qualifications", ""),
            "hospital": doctor.get("hospital", ""),
            "summary": doctor.get("summary", ""),
            "fee": doctor.get("fee", "N/A"),
            "image_base64": image_base64
        }

        return jsonify({"doctor": doctor_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/get_sessions", methods=["POST"])
def get_sessions():
    try:
        data = request.get_json()
        doctor_id = data.get("doctor_id")

        if not doctor_id:
            return jsonify({"error": "Doctor ID is required"}), 400

        sessions_cursor = session_collection.find({"doctor_id": doctor_id})
        sessions = []
        for session in sessions_cursor:
            session_data = {
                "_id": str(session.get("_id")),
                "doctor_id": session.get("doctor_id"),
                "doctor_name": session.get("doctor_name"),
                "specialization": session.get("specialization"),
                "qualifications": session.get("qualifications"),
                "date": session.get("date"),
                "time": session.get("time"),
                "fee": session.get("fee"),
                "doctor_image_base64": base64.b64encode(session.get("image_binary")).decode("utf-8") if session.get("image_binary") else None
            }
            sessions.append(session_data)

        return jsonify({"sessions": sessions}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_all_doctors", methods=["GET"])
def get_all_doctors():
    try:
        doctors_cursor = doctor_collection.find()
        doctors = []
        for doc in doctors_cursor:
            doctor_data = {
                "_id": str(doc.get("_id")),
                "doctor_id": doc.get("doctor_id", ""),  #doctor_id is included
                "name": doc.get("name", ""),
                "specialization": doc.get("specialization", ""),
                "qualifications": doc.get("qualifications", ""),
                "hospital": doc.get("hospital", ""),
                "summary": doc.get("summary", ""),
                "image_base64": base64.b64encode(doc.get("image_binary")).decode("utf-8") if doc.get("image_binary") else None
            }
            doctors.append(doctor_data)
        return jsonify({"doctors": doctors}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/get_times_by_date", methods=["POST"])
def get_times_by_date():
    try:
        data = request.get_json(force=True)
        date = data.get("date")
        if not date:
            return jsonify({"error": "Date is required"}), 400

        sessions_cursor = session_collection.find({"date": date})
        sessions = []
        for session in sessions_cursor:
            sessions.append({
                "doctor_id": session.get("doctor_id"),
                "time": session.get("time"),
                "date": session.get("date")
            })

        return jsonify(sessions), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
  

@app.route("/book_session", methods=["POST"])
def book_session():
    try:
        data = request.get_json()

        required_fields = ["patient_id", "doctor_id", "date", "time"]
        if not all(field in data and data[field] for field in required_fields):
            missing = [field for field in required_fields if field not in data or not data[field]]
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        booking = {
            "patient_id": data["patient_id"],
            "doctor_id": data["doctor_id"],
            "date": data["date"],
            "time": data["time"],
            "status": "booked",
            "created_at": datetime.utcnow()
        }

        inserted = booking_collection.insert_one(booking)
        booking["_id"] = str(inserted.inserted_id)  # convert ObjectId to string

        return jsonify({"message": "Session booked successfully", "booking": booking}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/get_booked_sessions/<patient_id>", methods=["GET"])
def get_booked_sessions(patient_id):
    try:
        
        bookings_cursor = booking_collection.find({"patient_id": patient_id})
        sessions = []

        for booking in bookings_cursor:
            doctor = doctor_collection.find_one({"doctor_id": booking.get("doctor_id")})
            if not doctor:
                continue

            session_info = {
                "name": doctor.get("name", "Unknown"),
                "specialty": doctor.get("specialization", "N/A"),
                "qualifications": doctor.get("qualifications", "N/A"),
                "date": booking.get("date", ""),
                "time": booking.get("time", "")
            }
            sessions.append(session_info)

        return jsonify({"sessions": sessions}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_bookings_by_doctor/<doctor_id>", methods=["GET"])
def get_bookings_by_doctor(doctor_id):
    try:
        bookings_cursor = booking_collection.find({"doctor_id": doctor_id})
        sessions = []

        for booking in bookings_cursor:
            patient = collection.find_one({"patient_id": booking.get("patient_id")})
            if not patient:
                continue

            session = {
                "name": patient.get("name", "Unknown Patient"),
                "specialty": "Patient Booked",
                "qualifications": f"Patient ID: {booking.get('patient_id')}",
                "date": booking.get("date"),
                "time": booking.get("time"),
            }
            sessions.append(session)

        return jsonify({"sessions": sessions}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
