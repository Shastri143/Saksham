import {
  Users, Activity, CheckCircle2, TrendingUp,
  Clock, Package, Quote,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import StatCard from '../components/StatCard.jsx';
import { students } from '../data/students.js';
import { villages } from '../data/villages.js';
import { interventions } from '../data/students.js';
import './Impact.css';

const attendanceImprovement = [
  { month: 'Jan', before: 72, after: 72 },
  { month: 'Feb', before: 66, after: 66 },
  { month: 'Mar', before: 61, after: 61 },
  { month: 'Apr', before: 68, after: 68 },
  { month: 'May', before: 75, after: 75 },
  { month: 'Jun', before: 70, after: 82 },
];

const riskOverTime = [
  { month: 'Jan', risk: 58 }, { month: 'Feb', risk: 64 },
  { month: 'Mar', risk: 71 }, { month: 'Apr', risk: 65 },
  { month: 'May', risk: 58 }, { month: 'Jun', risk: 49 },
];

const interventionSuccess = [
  { name: 'Resolved', value: 8, color: '#4a7c44' },
  { name: 'In Progress', value: 7, color: '#d88a5a' },
  { name: 'Follow-up', value: 1, color: '#d89a2b' },
  { name: 'Pending', value: 1, color: '#8a9588' },
];

const impactStats = [
  { label: 'Students Supported', value: 1248, icon: Users, color: 'primary' },
  { label: 'Interventions', value: 342, icon: Activity, color: 'secondary' },
  { label: 'Dropouts Prevented', value: 17, icon: CheckCircle2, color: 'success' },
  { label: 'Attendance Improvement', value: 18, icon: TrendingUp, color: 'primary', suffix: '%' },
  { label: 'Learning Hours Added', value: 1240, icon: Clock, color: 'secondary' },
  { label: 'Resources Distributed', value: 186, icon: Package, color: 'warning' },
];

export default function Impact() {
  const villagePerformance = villages.map((v) => ({
    name: v.name,
    attendance: v.avgAttendance,
    atRisk: v.atRiskStudents,
  }));

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Impact Dashboard</h1>
        <p className="page-subtitle">Measuring outcomes across all interventions</p>
      </div>

      <div className="grid grid-3 impact-stats">
        {impactStats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
            color={s.color}
            suffix={s.suffix || ''}
          />
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card card-pad">
          <h3 className="section-title">Attendance Improvement</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={attendanceImprovement}>
              <defs>
                <linearGradient id="beforeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b75934" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#b75934" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="afterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4a7c44" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4a7c44" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="month" stroke="#8a9588" fontSize={12} />
              <YAxis stroke="#8a9588" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Area type="monotone" dataKey="before" stroke="#b75934" strokeWidth={2} fill="url(#beforeGrad)" />
              <Area type="monotone" dataKey="after" stroke="#4a7c44" strokeWidth={2} fill="url(#afterGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad">
          <h3 className="section-title">Dropout Risk Over Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={riskOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="month" stroke="#8a9588" fontSize={12} />
              <YAxis stroke="#8a9588" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Line type="monotone" dataKey="risk" stroke="#214c31" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card card-pad">
          <h3 className="section-title">Village Performance</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={villagePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="name" stroke="#8a9588" fontSize={11} angle={-20} textAnchor="end" height={50} />
              <YAxis stroke="#8a9588" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Bar dataKey="attendance" fill="#214c31" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad">
          <h3 className="section-title">Intervention Success Rate</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={interventionSuccess}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {interventionSuccess.map((e) => (
                  <Cell key={e.name} fill={e.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="impact-legend">
            {interventionSuccess.map((r) => (
              <span key={r.name} className="impact-legend-item">
                <span className="badge-dot" style={{ background: r.color }} /> {r.name} ({r.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Stories */}
      <div className="card card-pad impact-stories">
        <h3 className="section-title">Impact Stories</h3>
        <div className="impact-story">
          <Quote size={28} color="var(--primary)" />
          <p>
            <strong>Rahul's</strong> attendance improved from <strong>54% to 84%</strong> after receiving
            volunteer support and offline learning resources. He's now back on track and preparing
            for his board exams.
          </p>
        </div>
        <div className="impact-story">
          <Quote size={28} color="var(--success)" />
          <p>
            <strong>Sunita</strong> was on the verge of dropping out before her board exams due to
            lack of textbooks. After receiving books and family counseling, her attendance rose
            from <strong>35% to 62%</strong> and she's now preparing for exams.
          </p>
        </div>
        <div className="impact-story">
          <Quote size={28} color="var(--secondary)" />
          <p>
            <strong>Pooja's</strong> family was considering pulling her out of school for work. A
            need-based scholarship and science tutoring brought her attendance from
            <strong> 42% to 67%</strong>, keeping her in school.
          </p>
        </div>
      </div>
    </div>
  );
}
