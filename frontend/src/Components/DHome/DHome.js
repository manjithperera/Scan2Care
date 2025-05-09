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
import { useSelector } from "react-redux";
import "./DHome.css";
import axios from "axios";

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

  const doctorId = useSelector((state) => state.user.doctorId);

  const handleAddSession = async () => {
    if (!doctorId) {
      alert("Doctor ID not found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("doctor_id", doctorId);
    formData.append("doctor_name", doctorName);
    formData.append("image", imageFile);
    formData.append("qualifications", qualifications);
    formData.append("time_slot", `${timeSlot1?.toLocaleTimeString()} - ${timeSlot2?.toLocaleTimeString()}`);
    formData.append("specialization", specialization);
    formData.append("fee", fee);
    formData.append("hospital", hospital);
    formData.append("summary", summary);
    formData.append("date", selectedDate.toISOString().split("T")[0]);

    try {
      const response = await axios.post("http://localhost:5000/add_session", formData);
      if (response.status === 200) {
        alert("Session added successfully!");
        // Optionally reset form
        setDoctorName("");
        setImageFile(null);
        setQualifications("");
        setTimeSlot1(null);
        setTimeSlot2(null);
        setSpecialization("");
        setFee("");
        setHospital("");
        setSummary("");
        setSelectedDate(new Date());

        // You could also fetch the latest sessions here if needed.
      }
    } catch (error) {
      console.error("Error adding session:", error);
      alert("Failed to add session.");
    }
  };

  return (
    <Box className="add-session-container">
      <Typography variant="h6" className="add-session-title">
        Add Session
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ mt: 2, mb: 2, color: "primary.main" }}
      >
        Logged in Doctor ID: <strong>{doctorId || "Not Logged In"}</strong>
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
                  <input type="file" hidden onChange={(e) => setImageFile(e.target.files[0])} />
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
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                    <TimePicker
                      label="Time Slot 2"
                      value={timeSlot2}
                      onChange={(newValue) => setTimeSlot2(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
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
            sx={{ mt: 2 }}
            onClick={handleAddSession}
          >
            Add Session
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddSessionForm;
