function addMinutes(timeStr, mins) {
  const hours = parseInt(timeStr.slice(0, 2), 10);
  const minutes = parseInt(timeStr.slice(2, 4), 10);
  const seconds = parseInt(timeStr.slice(4), 10);
  const date = new Date();
  date.setHours(hours, minutes + mins, seconds);
  return date.toTimeString().slice(0, 8).replace(/:/g, "");
}

export default function generateSchedule({ plots, motors, start, end, motorTime, interval }) {
  const schedule = [];
  let current = start;
  let index = 0;
  const plotNames = Array.from({ length: plots }, (_, i) => `D${i + 1}`);
  const motorNames = Array.from({ length: motors }, (_, i) => `M${i + 1}`);

  while (current < end) {
    for (let i = 0; i < plotNames.length; i += motors) {
      const batch = plotNames.slice(i, i + motors);
      batch.forEach((plot, j) => {
        const startTime = current;
        const endTime = addMinutes(startTime, motorTime);
        schedule.push({
          index: index++,
          plot,
          startTime,
          endTime,
          RunBy: motorNames[j]
        });
      });
      current = addMinutes(current, motorTime);
    }
    current = addMinutes(current, interval);
  }

  return schedule;
}

export function getStatus(entry, now) {
  const start = new Date();
  start.setHours(
    parseInt(entry.startTime.slice(0, 2)),
    parseInt(entry.startTime.slice(2, 4)),
    parseInt(entry.startTime.slice(4))
  );
  const end = new Date();
  end.setHours(
    parseInt(entry.endTime.slice(0, 2)),
    parseInt(entry.endTime.slice(2, 4)),
    parseInt(entry.endTime.slice(4))
  );
  if (now < start) return "Pending";
  if (now >= start && now <= end) return "In Progress";
  return "Done";
}
