import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  InputLabel,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux"; // << useSelector to access doctorId
import "./DHome.css";

const AddSessionForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [doctorName, setDoctorName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [qualifications, setQualifications] = useState("");
  const [timeSlot1, setTimeSlot1] = useState(null);
  const [timeSlot2, setTimeSlot2] = useState(null);
  const [specialization, setSpecialization] = useState("");
  const [fee, setFee] = useState("");
  const [hospital, setHospital] = useState("");
  const [summary, setSummary] = useState("");

  // 🔽 Get doctorId from Redux store
  const doctorId = useSelector((state) => state.auth?.user?.id); // Adjust path based on your actual reducer structure

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const formatTime = (date) => {
    if (!date) return null;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const handleSubmit = async () => {
    if (!doctorId) {
      alert("Doctor ID not found. Please log in again.");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    if (!timeSlot1 && !timeSlot2) {
      alert("Please enter at least one time slot.");
      return;
    }

    try {
      const base64Image = await convertToBase64(imageFile);
      const timeSlotsFormatted = [formatTime(timeSlot1), formatTime(timeSlot2)].filter(Boolean).join(", ");

      const sessionData = {
        doctor_id: doctorId, // ✅ Include doctorId
        doctor_name: doctorName,
        qualifications,
        specialization,
        fee,
        hospital,
        summary,
        date: selectedDate.toISOString().split("T")[0],
        time_slot: timeSlotsFormatted,
        image: base64Image,
      };

      const response = await fetch("http://localhost:5000/add_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Session added successfully!");
        console.log(result);
      } else {
        console.error(result);
        alert("Failed to add session: " + result.error);
      }
    } catch (error) {
      console.error("Error while submitting session:", error);
    }
  };

  return (
    <Box className="add-session-container">
      <Typography variant="h6" className="add-session-title">
        Add Session
      </Typography>

      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={7}>
          <Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Doctor Name"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink className="upload-label">
                  Upload Image
                </InputLabel>
                <Button
                  variant="outlined"
                  component="label"
                  className="upload-button"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file here
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" mt={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Qualifications"
                  placeholder="e.g MBBS, MD (Pediatrics)"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel shrink>Time Slots</InputLabel>
                <Box display="flex" gap={1}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Time Slot 1"
                      value={timeSlot1}
                      onChange={(newValue) => setTimeSlot1(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                    <TimePicker
                      label="Time Slot 2"
                      value={timeSlot2}
                      onChange={(newValue) => setTimeSlot2(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" mt={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Doctor Fee"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>

            <TextField
              label="Working in Hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Professional Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={5} mt={3}>
          <Paper elevation={2} className="calendar-paper">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                className="calendar"
              />
            </LocalizationProvider>
          </Paper>

          <Button
            variant="contained"
            className="add-session-button"
            onClick={handleSubmit}
          >
            Add Session
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddSessionForm;
