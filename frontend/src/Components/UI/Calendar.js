// src/components/ui/Calendar.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="Calendar-wrapper">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export { CustomCalendar as Calendar };
