import { getStatus } from "../utils/scheduler";

export default function ScheduleChart({ schedule, filters }) {
  const now = new Date();
  const filtered = schedule.filter((entry) => {
    const matchPlot = filters.plot === "All" || entry.plot === filters.plot;
    const matchStatus =
      filters.status === "All" || getStatus(entry, now) === filters.status;
    return matchPlot && matchStatus;
  });

  return (
    <div className="chart">
      {filtered.map((entry) => (
        <div key={entry.index} className="card">
          <h3>{entry.plot}</h3>
          <p>From: {entry.startTime}</p>
          <p>To: {entry.endTime}</p>
          <p>Motor: {entry.RunBy}</p>
          <p>Status: {getStatus(entry, now)}</p>
        </div>
      ))}
    </div>
  );
}
