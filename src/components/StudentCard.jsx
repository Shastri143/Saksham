import { Link } from 'react-router-dom';
import { MapPin, TrendingUp } from 'lucide-react';
import RiskBadge from './RiskBadge.jsx';
import RiskChart from './RiskChart.jsx';
import './StudentCard.css';

export default function StudentCard({ student }) {
  return (
    <Link to={`/app/students/${student.id}`} className="student-card card card-hover">
      <div className="student-card-top">
        <div className="student-avatar">
          {student.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
        </div>
        <RiskBadge level={student.riskLevel} />
      </div>
      <h3 className="student-name">{student.name}</h3>
      <div className="student-meta">
        <span className="student-meta-item">
          <MapPin size={14} /> {student.village}
        </span>
        <span className="student-meta-item">Grade {student.grade}</span>
      </div>
      <div className="student-card-body">
        <RiskChart score={student.riskScore} size={70} />
        <div className="student-card-stats">
          <div className="student-stat">
            <span className="student-stat-label">Attendance</span>
            <span className="student-stat-value">{student.attendance}%</span>
          </div>
          <div className="student-stat">
            <span className="student-stat-label">Academic</span>
            <span className="student-stat-value">{student.academicScore}%</span>
          </div>
          <div className="student-stat">
            <span className="student-stat-label">Absences</span>
            <span className="student-stat-value">{student.recentAbsences}d</span>
          </div>
        </div>
      </div>
      <div className="student-card-footer">
        <TrendingUp size={14} />
        <span>Risk Score {student.riskScore}/100</span>
      </div>
    </Link>
  );
}
