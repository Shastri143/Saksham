import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  CartesianGrid, PieChart, Pie, Cell,
} from 'recharts';
import RiskBadge from '../components/RiskBadge.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { students } from '../data/students.js';
import './Attendance.css';

const presentAbsent = [
  { name: 'Present', value: 874, color: '#4a7c44' },
  { name: 'Absent', value: 374, color: '#b75934' },
];

const monthlyAvg = [
  { month: 'Jan', attendance: 78 }, { month: 'Feb', attendance: 72 },
  { month: 'Mar', attendance: 64 }, { month: 'Apr', attendance: 70 },
  { month: 'May', attendance: 76 }, { month: 'Jun', attendance: 81 },
];

export default function Attendance() {
  const { search: globalSearch } = useOutletContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const effectiveSearch = globalSearch || search;

  const filtered = students.filter((s) => {
    const q = effectiveSearch.toLowerCase();
    const matchesSearch = !q ||
      s.name.toLowerCase().includes(q) ||
      s.village.toLowerCase().includes(q);
    const matchesFilter = filter === 'All' ||
      (filter === 'Low' && s.attendance < 50) ||
      (filter === 'Medium' && s.attendance >= 50 && s.attendance < 75) ||
      (filter === 'High' && s.attendance >= 75);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track attendance across all students and villages</p>
      </div>

      <div className="grid grid-3 attendance-stats">
        <div className="card card-pad attendance-stat-card">
          <span className="attendance-stat-label">Average Attendance</span>
          <span className="attendance-stat-value">73%</span>
          <span className="attendance-stat-trend up">
            <TrendingUp size={14} /> +5% this month
          </span>
        </div>
        <div className="card card-pad attendance-stat-card">
          <span className="attendance-stat-label">Below 50% Attendance</span>
          <span className="attendance-stat-value danger">7</span>
          <span className="attendance-stat-trend down">
            <TrendingDown size={14} /> 2 new this week
          </span>
        </div>
        <div className="card card-pad attendance-stat-card">
          <span className="attendance-stat-label">Above 80% Attendance</span>
          <span className="attendance-stat-value success">8</span>
          <span className="attendance-stat-trend up">
            <TrendingUp size={14} /> +1 this week
          </span>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card card-pad">
          <h3 className="section-title">Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyAvg}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="month" stroke="#8a9588" fontSize={12} />
              <YAxis stroke="#8a9588" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Bar dataKey="attendance" fill="#214c31" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad">
          <h3 className="section-title">Present vs Absent</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={presentAbsent}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {presentAbsent.map((e) => (
                  <Cell key={e.name} fill={e.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="attendance-legend">
            {presentAbsent.map((r) => (
              <span key={r.name} className="attendance-legend-item">
                <span className="badge-dot" style={{ background: r.color }} /> {r.name} ({r.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="attendance-table-section">
        <div className="attendance-toolbar">
          <SearchBar
            value={effectiveSearch}
            onChange={setSearch}
            placeholder="Search by name or village..."
          />
          <div className="attendance-filters">
            {['All', 'Low', 'Medium', 'High'].map((f) => (
              <button
                key={f}
                className={`attendance-filter ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="card attendance-table-wrap">
          <div className="attendance-table-scroll">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Village</th>
                  <th>Attendance</th>
                  <th>Recent Absences</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.village}</td>
                    <td>
                      <div className="attendance-bar-cell">
                        <div className="attendance-bar-mini">
                          <div
                            className="attendance-bar-mini-fill"
                            style={{
                              width: `${s.attendance}%`,
                              background: s.attendance < 50 ? 'var(--danger)' : s.attendance < 75 ? 'var(--warning)' : 'var(--success)',
                            }}
                          />
                        </div>
                        <span>{s.attendance}%</span>
                      </div>
                    </td>
                    <td>{s.recentAbsences} days</td>
                    <td><RiskBadge level={s.riskLevel} showDot={false} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
