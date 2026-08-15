import { Users, TrendingUp } from 'lucide-react';
import RiskBadge from './RiskBadge.jsx';
import './VillageCard.css';

export default function VillageCard({ village, onClick }) {
  return (
    <div
      className={`village-card card card-hover card-pad ${village.riskLevel}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="village-card-top">
        <div>
          <h3 className="village-name">{village.name}</h3>
          <span className="village-district">{village.district}</span>
        </div>
        <RiskBadge level={village.riskLevel} />
      </div>
      <div className="village-stats">
        <div className="village-stat">
          <Users size={16} />
          <span className="village-stat-value">{village.atRiskStudents}</span>
          <span className="village-stat-label">at risk</span>
        </div>
        <div className="village-stat">
          <TrendingUp size={16} />
          <span className="village-stat-value">{village.avgAttendance}%</span>
          <span className="village-stat-label">attendance</span>
        </div>
      </div>
      <div className="village-bar">
        <div className="village-bar-label">
          <span>Students at risk</span>
          <span>{village.atRiskStudents} / {village.totalStudents}</span>
        </div>
        <div className="village-bar-track">
          <div className={`village-bar-fill dot-${village.riskLevel}`} style={{ width: `${(village.atRiskStudents / village.totalStudents) * 100}%` }} />
        </div>
      </div>
      {village.pendingInterventions > 0 && (
        <div className="village-pending">{village.pendingInterventions} pending interventions</div>
      )}
    </div>
  );
}
