import { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Users, ShieldAlert, Activity, CheckCircle2,
  ArrowRight, Brain, MapPin, Clock,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid,
} from 'recharts';
import StatCard from '../components/StatCard.jsx';
import StudentCard from '../components/StudentCard.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import { students, interventions } from '../data/students.js';
import { villages } from '../data/villages.js';
import './Dashboard.css';

const riskDistribution = [
  { name: 'Low', value: 6, color: '#4a7c44' },
  { name: 'Moderate', value: 5, color: '#d89a2b' },
  { name: 'High', value: 5, color: '#d88a5a' },
  { name: 'Critical', value: 4, color: '#b75934' },
];

const attendanceTrend = [
  { month: 'Jan', avg: 72 }, { month: 'Feb', avg: 66 },
  { month: 'Mar', avg: 61 }, { month: 'Apr', avg: 68 }, { month: 'May', avg: 75 },
];

export default function Dashboard() {
  const { search } = useOutletContext();
  const [showCopilot, setShowCopilot] = useState(false);

  const criticalStudents = useMemo(
    () => students.filter((s) => s.riskLevel === 'critical' || s.riskLevel === 'high').slice(0, 6),
    [],
  );

  const filteredStudents = useMemo(() => {
    if (!search) return criticalStudents;
    const q = search.toLowerCase();
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.village.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [search, criticalStudents]);

  const topStudent = students[0];
  const activeInterventions = interventions.filter((i) => i.status !== 'Resolved');

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of students at risk and active interventions</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-4 dashboard-stats">
        <StatCard label="Total Students" value={1248} icon={Users} color="primary" />
        <StatCard label="At Risk" value={86} icon={ShieldAlert} color="danger" />
        <StatCard label="Active Interventions" value={43} icon={Activity} color="warning" />
        <StatCard label="Dropouts Prevented" value={17} icon={CheckCircle2} color="success" />
      </div>

      {/* Charts row */}
      <div className="grid grid-3 dashboard-charts">
        <div className="card card-pad dashboard-chart-wide">
          <h3 className="section-title">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#214c31" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#214c31" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="month" stroke="#8a9588" fontSize={12} />
              <YAxis stroke="#8a9588" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Area type="monotone" dataKey="avg" stroke="#214c31" strokeWidth={2.5} fill="url(#attGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad">
          <h3 className="section-title">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={riskDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {riskDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="dashboard-legend">
            {riskDistribution.map((r) => (
              <span key={r.name} className="dashboard-legend-item">
                <span className="badge-dot" style={{ background: r.color }} /> {r.name} ({r.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Copilot + Critical Students */}
      <div className="dashboard-grid-2col">
        <div className="card card-pad dashboard-copilot">
          <div className="dashboard-copilot-header">
            <span className="dashboard-copilot-icon"><Brain size={20} /></span>
            <h3 className="section-title" style={{ margin: 0 }}>Intervention Copilot</h3>
          </div>
          <p className="dashboard-copilot-text">
            <strong>{topStudent.name}</strong> has an <strong>{topStudent.riskScore}/100</strong> dropout risk.
          </p>
          <div className="dashboard-copilot-concerns">
            <span className="dashboard-copilot-label">Main concerns:</span>
            <ul>
              {topStudent.aiConcerns.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
          {showCopilot && (
            <div className="dashboard-copilot-actions fade-in">
              <span className="dashboard-copilot-label">Recommended Actions:</span>
              <ol>
                {topStudent.aiActions.map((a, i) => (
                  <li key={a}>{i + 1}. {a}</li>
                ))}
              </ol>
            </div>
          )}
          <div className="dashboard-copilot-buttons">
            {!showCopilot ? (
              <button className="btn btn-primary btn-sm" onClick={() => setShowCopilot(true)}>
                Generate Recommendation
              </button>
            ) : (
              <>
                <Link to={`/app/students/${topStudent.id}`} className="btn btn-primary btn-sm">
                  Create Intervention <ArrowRight size={14} />
                </Link>
                <Link to="/app/volunteers" className="btn btn-secondary btn-sm">Assign Volunteer</Link>
              </>
            )}
          </div>
        </div>

        <div className="dashboard-critical">
          <div className="dashboard-critical-header">
            <h3 className="section-title" style={{ margin: 0 }}>Students Needing Attention</h3>
            <Link to="/app/students" className="dashboard-view-all">View all →</Link>
          </div>
          <div className="dashboard-critical-list">
            {filteredStudents.map((s) => (
              <Link key={s.id} to={`/app/students/${s.id}`} className="dashboard-critical-item card card-hover">
                <div className="dashboard-critical-info">
                  <strong>{s.name}</strong>
                  <span><MapPin size={12} /> {s.village} · Grade {s.grade}</span>
                </div>
                <div className="dashboard-critical-right">
                  <span className="dashboard-critical-score">{s.riskScore}/100</span>
                  <RiskBadge level={s.riskLevel} showDot={false} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Active interventions + village snapshot */}
      <div className="dashboard-grid-2col">
        <div className="card card-pad">
          <div className="dashboard-critical-header">
            <h3 className="section-title" style={{ margin: 0 }}>Active Interventions</h3>
            <Link to="/app/interventions" className="dashboard-view-all">View all →</Link>
          </div>
          <div className="dashboard-intervention-list">
            {activeInterventions.slice(0, 5).map((iv) => (
              <div key={iv.id} className="dashboard-intervention-item">
                <div className="dashboard-intervention-info">
                  <Link to={`/app/students/${iv.studentId}`}><strong>{iv.studentName}</strong></Link>
                  <span>{iv.problem}</span>
                </div>
                <div className="dashboard-intervention-right">
                  <RiskBadge level={iv.riskLevel} showDot={false} />
                  <span className="dashboard-intervention-status">{iv.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="dashboard-critical-header">
            <h3 className="section-title" style={{ margin: 0 }}>Village Risk Snapshot</h3>
            <Link to="/app/villages" className="dashboard-view-all">View all →</Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={villages.map((v) => ({ name: v.name, atRisk: v.atRiskStudents }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="name" stroke="#8a9588" fontSize={11} angle={-20} textAnchor="end" height={50} />
              <YAxis stroke="#8a9588" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Bar dataKey="atRisk" fill="#214c31" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
