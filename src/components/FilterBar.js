export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="filters">
      <select
        onChange={(e) =>
          setFilters({ ...filters, plot: e.target.value })
        }
        value={filters.plot}
      >
        <option>All</option>
        <option>D1</option>
        <option>D2</option>
        <option>D3</option>
        <option>D4</option>
      </select>
      <select
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
        value={filters.status}
      >
        <option>All</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
    </div>
  );
}
