import { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import { students } from '../data/students.js';
import './Students.css';

const filters = ['All', 'Low Risk', 'Moderate', 'High', 'Critical'];

const filterMap = {
  'All': null,
  'Low Risk': 'low',
  'Moderate': 'moderate',
  'High': 'high',
  'Critical': 'critical',
};

export default function Students() {
  const { search: globalSearch } = useOutletContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const effectiveSearch = globalSearch || search;

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = effectiveSearch.toLowerCase();
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.village.toLowerCase().includes(q);
      const riskLevel = filterMap[filter];
      const matchesFilter = !riskLevel || s.riskLevel === riskLevel;
      return matchesSearch && matchesFilter;
    });
  }, [effectiveSearch, filter]);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">{filtered.length} of {students.length} students</p>
      </div>

      <div className="students-toolbar">
        <SearchBar
          value={effectiveSearch}
          onChange={setSearch}
          placeholder="Search by name or village..."
        />
        <div className="students-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`students-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="students-table-wrap card">
        <div className="students-table-scroll">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Village</th>
                <th>Attendance</th>
                <th>Academic</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="students-row">
                  <td>
                    <div className="students-name-cell">
                      <span className="students-avatar">
                        {s.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </span>
                      <div>
                        <strong>{s.name}</strong>
                        <span>Grade {s.grade} · {s.age}y</span>
                      </div>
                    </div>
                  </td>
                  <td>{s.village}</td>
                  <td>
                    <span className={`students-attendance ${s.attendance < 50 ? 'danger' : s.attendance < 75 ? 'warning' : 'success'}`}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td>{s.academicScore}%</td>
                  <td>
                    <span className="students-risk-score">{s.riskScore}/100</span>
                  </td>
                  <td><RiskBadge level={s.riskLevel} /></td>
                  <td>
                    <Link to={`/app/students/${s.id}`} className="students-view-btn">
                      View <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="students-empty">No students found matching your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
