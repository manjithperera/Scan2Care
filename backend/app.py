from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt
from datetime import datetime

app = Flask(__name__)

# Enable CORS with credentials support
CORS(app, supports_credentials=True)

# MongoDB setup
client = MongoClient("mongodb+srv://manjithperera66:GBcCSKrWirAG3XQC@cluster0.ojaltri.mongodb.net/?retryWrites=true&w=majority&tls=true")
users_db = client["users"]
collection = users_db["patients"]
doctor_collection = users_db["doctors"]
session_collection = users_db["doctor_sessions"]

# Load ML model
model = load_model('./model/skin_cancer_model.h5')
class_map = {0: "BCC", 1: "Melanoma", 2: "SCC"}

@app.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON or no data provided"}), 400

        name, email, user_type, password = data.get("name"), data.get("email"), data.get("userType"), data.get("password")
        if not all([name, email, user_type, password]):
            return jsonify({"error": "All fields are required"}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        collection_ref = collection if user_type == "patient" else doctor_collection

        existing_user = collection_ref.find_one({"email": email})
        if existing_user:
            user_info = {
                "name": existing_user.get("name"),
                "email": existing_user.get("email"),
                "user_type": existing_user.get("user_type")
            }
            if user_type == "doctor":
                user_info["doctor_id"] = str(existing_user.get("_id"))
            return jsonify({"error": "User already exists", "user": user_info}), 409

        user = {
            "name": name,
            "email": email,
            "user_type": user_type,
            "password": hashed_password
        }

        result = collection_ref.insert_one(user)

        if user_type == "doctor":
            doctor_id = str(result.inserted_id)
            return jsonify({
                "message": "Doctor registered successfully",
                "user": {
                    "name": name,
                    "email": email,
                    "user_type": user_type,
                    "doctor_id": doctor_id
                }
            }), 201

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON or no data provided"}), 400

        email, password, user_type = data.get("email"), data.get("password"), data.get("userType")
        if not all([email, password, user_type]):
            return jsonify({"error": "All fields are required"}), 400

        collection_ref = collection if user_type == "patient" else doctor_collection
        user = collection_ref.find_one({"email": email, "user_type": user_type})

        if not user:
            return jsonify({"error": "User not found"}), 404
        if not bcrypt.checkpw(password.encode('utf-8'), user.get("password")):
            return jsonify({"error": "Incorrect password"}), 401

        response_data = {
            "message": "Login successful",
            "user": {
                "name": user["name"],
                "email": user["email"],
                "user_type": user["user_type"]
            }
        }
        if user_type == "doctor":
            response_data["user"]["doctor_id"] = str(user["_id"])

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/google_login", methods=["POST"])
def google_login():
    try:
        data = request.get_json()
        name, email, user_type = data.get("name"), data.get("email"), data.get("userType")

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
            result = collection_ref.insert_one(new_user)
            new_user["_id"] = str(result.inserted_id)
            new_user_response = {
                "name": name,
                "email": email,
                "user_type": user_type
            }
            if user_type == "doctor":
                new_user_response["doctor_id"] = new_user["_id"]

            return jsonify({"message": "Google sign-in successful (new user)", "user": new_user_response}), 201
        else:
            user["_id"] = str(user["_id"])
            response_data = {
                "name": user["name"],
                "email": user["email"],
                "user_type": user["user_type"]
            }
            if user_type == "doctor":
                response_data["doctor_id"] = user["_id"]
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

        for file in files:
            image = Image.open(io.BytesIO(file.read())).resize((224, 224))
            image = np.array(image) / 255.0
            image = np.expand_dims(image, axis=0)

            pred = model.predict(image)
            predicted_class = np.argmax(pred, axis=1)[0]
            predictions.append(class_map.get(predicted_class, "Unknown"))

        return jsonify({"predictions": predictions})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/add_session", methods=["POST"])
def add_session():
    try:
        data = request.get_json()
        required_fields = ["doctor_name", "qualifications", "specialization", "hospital", "summary", "image", "time_slot", "fee", "date", "doctor_id"]
        if not all(field in data for field in required_fields):
            missing_fields = [field for field in required_fields if field not in data]
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Validate date
        try:
            datetime.strptime(data["date"], "%Y-%m-%d")
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

        doctor_id = data["doctor_id"]
        doctor = doctor_collection.find_one({"_id": ObjectId(doctor_id)})

        if not doctor:
            return jsonify({"error": "Doctor not found"}), 404

        doctor_collection.update_one(
            {"_id": ObjectId(doctor_id)},
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
            "fee": data["fee"]
        }

        session_collection.insert_one(session)
        return jsonify({"message": "Session added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_doctor_info", methods=["GET"])
def get_doctor_info():
    try:
        doctor_name = request.args.get("doctor_name")
        if not doctor_name:
            return jsonify({"error": "Doctor name is required"}), 400

        doctor = doctor_collection.find_one({"name": doctor_name})
        if not doctor:
            return jsonify({"error": "Doctor not found"}), 404

        image_base64 = base64.b64encode(doctor["image_binary"]).decode("utf-8") if doctor.get("image_binary") else None

        doctor_data = {
            "doctor_name": doctor["name"],
            "specialization": doctor["specialization"],
            "qualifications": doctor["qualifications"],
            "hospital": doctor["hospital"],
            "summary": doctor["summary"],
            "image_base64": image_base64
        }

        return jsonify({"doctor": doctor_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_sessions", methods=["GET"])
def get_sessions():
    try:
        sessions = list(session_collection.find())
        for session in sessions:
            session["_id"] = str(session["_id"])
            doctor = doctor_collection.find_one({"_id": ObjectId(session["doctor_id"])})
            session["doctor_image_base64"] = base64.b64encode(doctor["image_binary"]).decode("utf-8") if doctor and doctor.get("image_binary") else None

        return jsonify({"sessions": sessions}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
