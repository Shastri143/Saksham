import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import InterventionCard from '../components/InterventionCard.jsx';
import { interventions as initialInterventions } from '../data/students.js';
import './Interventions.css';

const statusFilters = ['All', 'Pending', 'In Progress', 'Follow-up', 'Resolved'];

export default function Interventions() {
  const { search: globalSearch } = useOutletContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [interventions, setInterventions] = useState(initialInterventions);

  const effectiveSearch = globalSearch || search;

  const filtered = useMemo(() => {
    return interventions.filter((iv) => {
      const q = effectiveSearch.toLowerCase();
      const matchesSearch = !q ||
        iv.studentName.toLowerCase().includes(q) ||
        iv.village.toLowerCase().includes(q) ||
        iv.problem.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || iv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [interventions, effectiveSearch, statusFilter]);

  const handleStatusChange = (id, newStatus) => {
    setInterventions((prev) =>
      prev.map((iv) => (iv.id === id ? { ...iv, status: newStatus } : iv)),
    );
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Interventions</h1>
        <p className="page-subtitle">{filtered.length} intervention cases</p>
      </div>

      <div className="interventions-toolbar">
        <SearchBar
          value={effectiveSearch}
          onChange={setSearch}
          placeholder="Search by student, village, or problem..."
        />
        <div className="interventions-filters">
          {statusFilters.map((f) => (
            <button
              key={f}
              className={`interventions-filter ${statusFilter === f ? 'active' : ''}`}
              onClick={() => setStatusFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-3">
        {filtered.map((iv) => (
          <InterventionCard
            key={iv.id}
            intervention={iv}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="interventions-empty">
          No interventions found matching your filters.
        </div>
      )}
    </div>
  );
}
