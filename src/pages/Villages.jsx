import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MapPin, Users, TrendingUp, X } from 'lucide-react';
import VillageCard from '../components/VillageCard.jsx';
import Modal from '../components/Modal.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import { villages } from '../data/villages.js';
import { students } from '../data/students.js';
import { volunteers } from '../data/volunteers.js';
import './Villages.css';

const heatColors = {
  critical: '#DC2626',
  high: '#F97316',
  moderate: '#F59E0B',
  low: '#16A34A',
};

export default function Villages() {
  const { search: globalSearch } = useOutletContext();
  const [selectedVillage, setSelectedVillage] = useState(null);

  const villageStudents = selectedVillage
    ? students.filter((s) => s.village === selectedVillage.name)
    : [];

  const villageVolunteers = selectedVillage
    ? volunteers.filter((v) => v.village === selectedVillage.name)
    : [];

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Villages</h1>
        <p className="page-subtitle">Risk heatmap across {villages.length} villages</p>
      </div>

      {/* Heatmap visualization */}
      <div className="card card-pad villages-heatmap-card">
        <h3 className="section-title">Village Risk Heatmap</h3>
        <div className="villages-heatmap">
          {villages.map((v) => (
            <button
              key={v.id}
              className="villages-heat-dot"
              style={{
                left: `${v.x}%`,
                top: `${v.y}%`,
                background: heatColors[v.riskLevel],
                '--dot-size': `${Math.max(28, v.atRiskStudents * 2.5)}px`,
              }}
              onClick={() => setSelectedVillage(v)}
              title={`${v.name} — ${v.atRiskStudents} at risk`}
            >
              <span className="villages-heat-count">{v.atRiskStudents}</span>
              <span className="villages-heat-name">{v.name}</span>
            </button>
          ))}
        </div>
        <div className="villages-legend">
          <span><span className="badge-dot dot-critical" /> Critical</span>
          <span><span className="badge-dot dot-high" /> High</span>
          <span><span className="badge-dot dot-moderate" /> Moderate</span>
          <span><span className="badge-dot dot-low" /> Low</span>
        </div>
      </div>

      {/* Village cards */}
      <h2 className="section-title villages-cards-title">All Villages</h2>
      <div className="grid grid-3">
        {villages.map((v) => (
          <VillageCard key={v.id} village={v} onClick={() => setSelectedVillage(v)} />
        ))}
      </div>

      {/* Village detail modal */}
      <Modal
        open={!!selectedVillage}
        onClose={() => setSelectedVillage(null)}
        title={selectedVillage?.name}
      >
        {selectedVillage && (
          <div className="villages-detail">
            <div className="villages-detail-header">
              <div className="villages-detail-meta">
                <span><MapPin size={14} /> {selectedVillage.district}</span>
                <RiskBadge level={selectedVillage.riskLevel} />
              </div>
            </div>

            <div className="villages-detail-stats">
              <div className="villages-detail-stat">
                <Users size={18} />
                <strong>{villageStudents.length}</strong>
                <span>Students</span>
              </div>
              <div className="villages-detail-stat">
                <span className="badge-dot" style={{ background: heatColors[selectedVillage.riskLevel] }} />
                <strong>{selectedVillage.atRiskStudents}</strong>
                <span>At Risk</span>
              </div>
              <div className="villages-detail-stat">
                <TrendingUp size={18} />
                <strong>{selectedVillage.avgAttendance}%</strong>
                <span>Avg Attendance</span>
              </div>
              <div className="villages-detail-stat">
                <Users size={18} />
                <strong>{villageVolunteers.length}</strong>
                <span>Volunteers</span>
              </div>
            </div>

            <div className="villages-detail-section">
              <span className="villages-detail-label">Resource Requirements</span>
              <div className="villages-detail-tags">
                {selectedVillage.resourceRequirements.length > 0 ? (
                  selectedVillage.resourceRequirements.map((r) => (
                    <span key={r} className="villages-detail-tag">{r}</span>
                  ))
                ) : (
                  <span className="villages-detail-empty">No pending requirements</span>
                )}
              </div>
            </div>

            <div className="villages-detail-section">
              <span className="villages-detail-label">Pending Interventions</span>
              <strong className="villages-detail-pending">{selectedVillage.pendingInterventions}</strong>
            </div>

            <div className="villages-detail-section">
              <span className="villages-detail-label">At-Risk Students</span>
              <div className="villages-detail-students">
                {villageStudents.filter((s) => s.riskLevel !== 'low').map((s) => (
                  <div key={s.id} className="villages-detail-student">
                    <span>{s.name}</span>
                    <RiskBadge level={s.riskLevel} showDot={false} />
                  </div>
                ))}
                {villageStudents.filter((s) => s.riskLevel !== 'low').length === 0 && (
                  <span className="villages-detail-empty">No at-risk students</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
