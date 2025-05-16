import React, { useState } from "react";
import generateSchedule from "../utils/scheduler";

export default function IrrigationForm({ setSchedule }) {
  const [input, setInput] = useState({
    plots: 4,
    motors: 2,
    start: "060000",
    end: "190000",
    motorTime: 5,
    interval: 20
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const chart = generateSchedule(input);
    setSchedule(chart);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {["plots", "motors", "motorTime", "interval"].map((field) => (
        <label key={field}>
          {field}
          <input
            type="number"
            value={input[field]}
            onChange={(e) =>
              setInput({ ...input, [field]: parseInt(e.target.value) })
            }
            required
          />
        </label>
      ))}
      <label>
        Start Time
        <input
          type="text"
          value={input.start}
          onChange={(e) => setInput({ ...input, start: e.target.value })}
          required
        />
      </label>
      <label>
        End Time
        <input
          type="text"
          value={input.end}
          onChange={(e) => setInput({ ...input, end: e.target.value })}
          required
        />
      </label>
      <button type="submit">Generate Schedule</button>
    </form>
  );
}
