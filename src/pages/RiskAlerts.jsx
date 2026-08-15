import { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ShieldAlert, Brain, ArrowRight, AlertTriangle,
  TrendingDown, Calendar, BookX, Wifi, Home,
} from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import RiskChart from '../components/RiskChart.jsx';
import { students } from '../data/students.js';
import './RiskAlerts.css';

const filters = ['All', 'Critical', 'High', 'Moderate', 'Low'];

const reasonIcons = {
  'Attendance': TrendingDown,
  'Academic': BookX,
  'Recent Absence': Calendar,
  'Digital Access': Wifi,
  'Economic Risk': Home,
};

export default function RiskAlerts() {
  const { search: globalSearch } = useOutletContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showCopilot, setShowCopilot] = useState(null);

  const effectiveSearch = globalSearch || search;

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const q = effectiveSearch.toLowerCase();
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.village.toLowerCase().includes(q);
      const matchesFilter = filter === 'All' ||
        s.riskLevel === filter.toLowerCase();
      return matchesSearch && matchesFilter;
    }).sort((a, b) => b.riskScore - a.riskScore);
  }, [effectiveSearch, filter]);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Risk Alerts</h1>
        <p className="page-subtitle">Early warning system — {filtered.length} students identified</p>
      </div>

      <div className="risk-alerts-toolbar">
        <SearchBar
          value={effectiveSearch}
          onChange={setSearch}
          placeholder="Search by name or village..."
        />
        <div className="risk-alerts-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`risk-alerts-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="risk-alerts-list">
        {filtered.map((s) => (
          <div key={s.id} className="risk-alert-card card card-pad">
            <div className="risk-alert-left">
              <RiskChart score={s.riskScore} size={80} />
              <div className="risk-alert-info">
                <div className="risk-alert-header">
                  <Link to={`/app/students/${s.id}`}><strong>{s.name}</strong></Link>
                  <RiskBadge level={s.riskLevel} />
                </div>
                <span className="risk-alert-village">{s.village} · Grade {s.grade} · {s.school}</span>
                <div className="risk-alert-reasons">
                  {s.riskFactors.filter((f) => f.value > 5).map((f) => {
                    const Icon = reasonIcons[f.label] || AlertTriangle;
                    return (
                      <span key={f.label} className="risk-alert-reason">
                        <Icon size={13} /> {f.label} ({f.value}%)
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="risk-alert-right">
              {showCopilot === s.id ? (
                <div className="risk-alert-copilot fade-in">
                  <div className="risk-alert-copilot-header">
                    <Brain size={16} />
                    <span>AI Recommendation</span>
                  </div>
                  <ol>
                    {s.aiActions.slice(0, 3).map((a, i) => (
                      <li key={a}>{i + 1}. {a}</li>
                    ))}
                  </ol>
                  <div className="risk-alert-copilot-actions">
                    <Link to={`/app/students/${s.id}`} className="btn btn-primary btn-sm">
                      Full Details <ArrowRight size={13} />
                    </Link>
                    <button className="btn btn-secondary btn-sm" onClick={() => setShowCopilot(null)}>
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="risk-alert-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowCopilot(s.id)}
                  >
                    <Brain size={14} /> Get Recommendation
                  </button>
                  <Link to={`/app/students/${s.id}`} className="btn btn-secondary btn-sm">
                    View Profile <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="risk-alerts-empty">
          <ShieldAlert size={32} color="var(--text-light)" />
          <p>No students found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
