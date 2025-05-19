import React, { useState, useEffect } from "react";
import "./Doctors.css"; // Ensure this CSS file exists and is correctly linked

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/get_all_doctors");
        const data = await response.json();
        if (response.ok) {
          setDoctors(data.doctors);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const selectedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + doctorsPerPage
  );

  return (
    <div className="doctors_container">
      {/* Header Section */}
      <div className="doctors_header_section">
        <img
          className="doctors_banner_image"
          src="/images/doctors-group.png"
          alt="Doctors"
        />
      </div>

      {/* Search Bar */}
      <div className="doctors_search_container">
        <h2>DOCTORS</h2>
        <input
          type="text"
          placeholder="Search Doctors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Doctor Cards */}
      <div className="doctors_grid">
        {selectedDoctors.map((doctor) => (
          <div key={doctor._id} className="doctors_card">
            {doctor.image_base64 ? (
              <img
                src={`data:image/png;base64,${doctor.image_base64}`}
                alt={doctor.name}
                className="doctors_image"
              />
            ) : (
              <div className="doctors_image_placeholder">No Image</div>
            )}
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <button className="doctors_details_button">More Details</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="doctors_pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i + 1}
            className={`doctors_page ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
