export default function Filters({ setFilter }) {
  return (
    <div className="card">
      <h3>Filters</h3>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>
    </div>
  );
}
