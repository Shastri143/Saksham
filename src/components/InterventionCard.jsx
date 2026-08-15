import { Link } from 'react-router-dom';
import { Calendar, User, MapPin } from 'lucide-react';
import RiskBadge from './RiskBadge.jsx';
import './InterventionCard.css';

const statusColors = {
  Pending: 'badge-moderate',
  'In Progress': 'badge-high',
  'Follow-up': 'badge-moderate',
  Resolved: 'badge-low',
};

export default function InterventionCard({ intervention, onStatusChange, showStatusControl = true }) {
  return (
    <div className="intervention-card card">
      <div className="intervention-card-header">
        <Link to={`/app/students/${intervention.studentId}`} className="intervention-student">
          {intervention.studentName}
        </Link>
        <RiskBadge level={intervention.riskLevel} showDot={false} />
      </div>

      <div className="intervention-card-meta">
        <span className="intervention-meta-item">
          <MapPin size={13} /> {intervention.village}
        </span>
        <span className="intervention-meta-item">
          <Calendar size={13} /> {intervention.createdDate}
        </span>
        <span className="intervention-meta-item">
          <User size={13} /> {intervention.volunteer}
        </span>
      </div>

      <p className="intervention-problem">{intervention.problem}</p>

      <div className="intervention-card-footer">
        <span className={`badge ${statusColors[intervention.status] || 'badge-moderate'}`}>
          {intervention.status}
        </span>
        {showStatusControl && onStatusChange && (
          <select
            className="intervention-status-select"
            value={intervention.status}
            onChange={(e) => onStatusChange(intervention.id, e.target.value)}
            aria-label="Change status"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Resolved">Resolved</option>
          </select>
        )}
      </div>
    </div>
  );
}
