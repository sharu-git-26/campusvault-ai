import { useEffect, useState } from "react";
import api from "../services/api";
import ResourceCard from "../components/ResourceCard";
import Filters from "../components/Filters";

export default function Dashboard() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const loadResources = async () => {
    const res = await api.get("/resources/");
    setResources(res.data);
  };

  const searchResources = async () => {
    const res = await api.get(`/resources/search?q=${search}`);
    setResources(res.data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const filtered = filter
    ? resources.filter(r => r.privacy === filter)
    : resources;

  return (
    <div className="container">
      <h2>📚 CampusVault AI Dashboard</h2>
      <input placeholder="AI Search..."
        onChange={(e) => setSearch(e.target.value)} />
      <button onClick={searchResources}>Search</button>

      <Filters setFilter={setFilter} />

      {filtered.map(r => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  );
}
