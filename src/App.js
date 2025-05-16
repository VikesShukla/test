// src/App.js
import React, { useState } from "react";
import IrrigationForm from "./components/IrrigationForm";
import ScheduleChart from "./components/ScheduleChart";
import FilterBar from "./components/FilterBar";
import "./styles.css";

export default function App() {
  const [schedule, setSchedule] = useState([]);
  const [filters, setFilters] = useState({ plot: "All", status: "All" });

  return (
    <div className="app">
      <h1 className="title">🌾 Irrigation System Scheduler 🌿</h1>
      <IrrigationForm setSchedule={setSchedule} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <ScheduleChart schedule={schedule} filters={filters} />
    </div>
  );
}
