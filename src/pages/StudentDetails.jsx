import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, GraduationCap, User,
  Brain, Package, Users, Mic, FileText, Plus, CheckCircle2,
  TrendingUp, Activity,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip,
  CartesianGrid, BarChart, Bar,
} from 'recharts';
import RiskChart from '../components/RiskChart.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import Modal from '../components/Modal.jsx';
import { students, interventions as allInterventions } from '../data/students.js';
import { volunteers } from '../data/volunteers.js';
import { resources, resourceRequests } from '../data/resources.js';
import './StudentDetails.css';

const timelineStatusConfig = {
  Healthy: { color: '#4a7c44', bg: 'var(--success-light)' },
  Warning: { color: '#d89a2b', bg: 'var(--warning-light)' },
  High: { color: '#d88a5a', bg: '#ecd3c0' },
  Critical: { color: '#b75934', bg: 'var(--danger-light)' },
  Improving: { color: '#214c31', bg: 'var(--primary-50)' },
  Moderate: { color: '#d89a2b', bg: 'var(--warning-light)' },
  Intervention: { color: '#fff', bg: 'var(--primary)' },
};

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((s) => s.id === id);

  const [showInterventionModal, setShowInterventionModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showFieldVisitModal, setShowFieldVisitModal] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [toast, setToast] = useState(null);
  const [interventionType, setInterventionType] = useState('Family Visit');
  const [interventionVolunteer, setInterventionVolunteer] = useState('');
  const [interventionNotes, setInterventionNotes] = useState('');
  const [localInterventions, setLocalInterventions] = useState([]);
  const [assignedVolunteerId, setAssignedVolunteerId] = useState(student?.assignedVolunteer || null);
  const [localResources, setLocalResources] = useState(resources.map((r) => ({ ...r })));
  const [resourceAllocated, setResourceAllocated] = useState(false);

  // Field visit form state
  const [visitDate, setVisitDate] = useState('');
  const [visitReason, setVisitReason] = useState('Attendance Problem');
  const [visitNotes, setVisitNotes] = useState('');
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [fieldReport, setFieldReport] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  if (!student) {
    return (
      <div className="page">
        <p>Student not found.</p>
        <Link to="/app/students">← Back to Students</Link>
      </div>
    );
  }

  const studentInterventions = [
    ...localInterventions,
    ...(allInterventions.filter((iv) => iv.studentId === student.id)),
  ];

  const assignedVolunteer = volunteers.find((v) => v.id === assignedVolunteerId);

  // Recommended volunteer: match by subject/need, nearby, available, low workload
  const recommendedVolunteer = useMemo(() => {
    const available = volunteers.filter((v) => v.availability === 'Today');
    if (available.length === 0) return volunteers[0];
    // Sort by distance + workload
    return available.sort((a, b) =>
      (a.distanceKm + a.studentsAssigned * 0.5) - (b.distanceKm + b.studentsAssigned * 0.5),
    )[0];
  }, []);

  const handleCreateIntervention = () => {
    const vol = volunteers.find((v) => v.name === interventionVolunteer) || recommendedVolunteer;
    const newIv = {
      id: `local-iv-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      village: student.village,
      riskLevel: student.riskLevel,
      problem: interventionType,
      volunteer: vol?.name || 'Unassigned',
      createdDate: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      notes: interventionNotes,
    };
    setLocalInterventions((prev) => [newIv, ...prev]);
    setShowInterventionModal(false);
    setInterventionNotes('');
    showToast('Intervention created successfully');
  };

  const handleAssignVolunteer = (volunteerId) => {
    setAssignedVolunteerId(volunteerId);
    setShowVolunteerModal(false);
    showToast('Volunteer assigned successfully');
  };

  const handleAllocateResource = () => {
    if (!student.resourceNeed) return;
    const resourceName = student.resourceNeed;
    setLocalResources((prev) =>
      prev.map((r) =>
        r.name === resourceName && r.available > 0
          ? { ...r, available: r.available - 1 }
          : r,
      ),
    );
    setResourceAllocated(true);
    setShowResourceModal(false);
    showToast(`${resourceName} allocated to ${student.name}`);
  };

  const handleFieldVisitSubmit = () => {
    const issueMap = {
      'Attendance Problem': 'Attendance',
      'Academic Problem': 'Academic concern',
      'Family Situation': 'Family situation',
      'Financial Problem': 'Financial situation',
      'Other': 'Other concern',
    };
    const report = {
      student: student.name,
      issue: issueMap[visitReason] || visitReason,
      academicConcern: student.academicScore < 40 ? 'Mathematics' : 'General',
      recommendedAction: visitReason === 'Family Situation' ? 'Follow-up + academic support' : 'Monitor + support',
      nextFollowUp: '7 days',
      date: visitDate || new Date().toISOString().slice(0, 10),
      notes: visitNotes,
      voice: voiceRecorded,
    };
    setFieldReport(report);
    showToast('Field visit report generated');
  };

  const resourceData = localResources.find((r) => r.name === student.resourceNeed);
  const canAllocate = resourceData && resourceData.available > 0 && !resourceAllocated;

  return (
    <div className="page fade-in student-details">
      {toast && <div className="toast toast-success">{toast}</div>}

      {/* Back link */}
      <Link to="/app/students" className="sd-back">
        <ArrowLeft size={16} /> Back to Students
      </Link>

      {/* Header */}
      <div className="sd-header card card-pad">
        <div className="sd-header-left">
          <div className="sd-avatar">
            {student.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="sd-name">{student.name}</h1>
            <div className="sd-header-meta">
              <span><MapPin size={14} /> {student.village}</span>
              <span><GraduationCap size={14} /> {student.school}</span>
              <span><User size={14} /> {student.grade} · {student.age}y</span>
            </div>
          </div>
        </div>
        <div className="sd-header-right">
          <RiskBadge level={student.riskLevel} />
          <div className="sd-action-buttons">
            <button className="btn btn-primary btn-sm" onClick={() => setShowInterventionModal(true)}>
              <Plus size={15} /> Create Intervention
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowVolunteerModal(true)}>
              <Users size={15} /> Assign Volunteer
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowResourceModal(true)}
              disabled={!student.resourceNeed}
            >
              <Package size={15} /> Allocate Resource
            </button>
          </div>
        </div>
      </div>

      {/* Risk Score + Why at risk */}
      <div className="grid grid-3 sd-risk-section">
        <div className="card card-pad sd-risk-card">
          <h3 className="section-title">Risk Score</h3>
          <div className="sd-risk-chart-wrap">
            <RiskChart score={student.riskScore} size={140} />
          </div>
          <div className="sd-risk-categories">
            <span className={student.riskLevel === 'low' ? 'active' : ''}>0–30 Low</span>
            <span className={student.riskLevel === 'moderate' ? 'active' : ''}>31–60 Moderate</span>
            <span className={student.riskLevel === 'high' ? 'active' : ''}>61–80 High</span>
            <span className={student.riskLevel === 'critical' ? 'active' : ''}>81–100 Critical</span>
          </div>
        </div>

        <div className="card card-pad sd-factors-card" style={{ gridColumn: 'span 2' }}>
          <h3 className="section-title">Why is this student at risk?</h3>
          <div className="sd-factors">
            {student.riskFactors.map((f) => (
              <div key={f.label} className="sd-factor">
                <div className="sd-factor-header">
                  <span className="sd-factor-label">{f.label}</span>
                  <span className="sd-factor-weight">{f.weight} weight</span>
                </div>
                <div className="sd-factor-bar">
                  <div
                    className="sd-factor-bar-fill"
                    style={{
                      width: `${f.value}%`,
                      background: f.value > 20 ? 'var(--danger)' : f.value > 10 ? 'var(--warning)' : 'var(--success)',
                    }}
                  />
                </div>
                <span className="sd-factor-value">{f.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Copilot */}
      <div className="card card-pad sd-copilot">
        <div className="sd-copilot-header">
          <span className="sd-copilot-icon"><Brain size={22} /></span>
          <div>
            <h3 className="section-title" style={{ margin: 0 }}>Intervention Copilot</h3>
            <span className="sd-copilot-subtitle">AI-powered recommendations</span>
          </div>
          {!showCopilot && (
            <button className="btn btn-primary btn-sm sd-copilot-gen" onClick={() => setShowCopilot(true)}>
              Generate Recommendation
            </button>
          )}
        </div>
        {showCopilot && (
          <div className="sd-copilot-body fade-in">
            <p className="sd-copilot-summary">
              <strong>{student.name}</strong> has an <strong>{student.riskScore}/100</strong> dropout risk.
            </p>
            <div className="sd-copilot-section">
              <span className="sd-copilot-label">Main concerns:</span>
              <ul>
                {student.aiConcerns.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
            <div className="sd-copilot-section">
              <span className="sd-copilot-label">Recommended Actions:</span>
              <ol>
                {student.aiActions.map((a, i) => (
                  <li key={a}>{i + 1}. {a}</li>
                ))}
              </ol>
            </div>
            <div className="sd-copilot-buttons">
              <button className="btn btn-primary btn-sm" onClick={() => setShowInterventionModal(true)}>
                Create Intervention
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowVolunteerModal(true)}>
                Assign Volunteer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Academic + Attendance charts */}
      <div className="grid grid-2">
        <div className="card card-pad">
          <h3 className="section-title">Academic Progress</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={student.academicHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="month" stroke="#8a9588" fontSize={12} />
              <YAxis stroke="#8a9588" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Line type="monotone" dataKey="score" stroke="#214c31" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card card-pad">
          <h3 className="section-title">Attendance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={student.attendanceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd4c0" vertical={false} />
              <XAxis dataKey="month" stroke="#8a9588" fontSize={12} />
              <YAxis stroke="#8a9588" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ddd4c0', fontSize: '0.85rem', background: '#fbf9f4' }} />
              <Bar dataKey="attendance" fill="#214c31" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact Timeline */}
      <div className="card card-pad sd-timeline-card">
        <h3 className="section-title">Impact Timeline</h3>
        <div className="sd-timeline">
          {student.timeline.map((item, i) => {
            const config = timelineStatusConfig[item.status] || timelineStatusConfig.Healthy;
            const isIntervention = item.status === 'Intervention';
            return (
              <div key={i} className="sd-timeline-item">
                <div className="sd-timeline-marker" style={{ background: config.bg, color: config.color }}>
                  {isIntervention ? '★' : i + 1}
                </div>
                <div className="sd-timeline-content">
                  <div className="sd-timeline-period">{item.period}</div>
                  {item.attendance !== null && (
                    <div className="sd-timeline-attendance" style={{ color: config.color }}>
                      Attendance: {item.attendance}%
                    </div>
                  )}
                  <div className="sd-timeline-status" style={{ color: config.color, fontWeight: 700 }}>
                    {item.status}
                  </div>
                  <div className="sd-timeline-note">{item.note}</div>
                </div>
                {i < student.timeline.length - 1 && <div className="sd-timeline-line" />}
              </div>
            );
          })}
        </div>
        <div className="sd-impact-summary">
          <TrendingUp size={18} color="var(--success)" />
          <span>Attendance improved by <strong>30%</strong> after intervention</span>
        </div>
      </div>

      {/* Volunteer + Intervention History */}
      <div className="grid grid-2">
        <div className="card card-pad">
          <h3 className="section-title">Volunteer</h3>
          {assignedVolunteer ? (
            <div className="sd-volunteer-assigned">
              <div className="sd-volunteer-avatar">
                {assignedVolunteer.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </div>
              <div className="sd-volunteer-info">
                <strong>{assignedVolunteer.name}</strong>
                <span>{assignedVolunteer.role}</span>
                <span>{assignedVolunteer.distanceKm} km away · {assignedVolunteer.availability}</span>
              </div>
            </div>
          ) : (
            <div className="sd-volunteer-recommended">
              <div className="sd-volunteer-rec-header">
                <span className="sd-volunteer-rec-label">Recommended Volunteer</span>
              </div>
              <div className="sd-volunteer-rec">
                <div className="sd-volunteer-avatar">
                  {recommendedVolunteer.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div className="sd-volunteer-info">
                  <strong>{recommendedVolunteer.name}</strong>
                  <span>{recommendedVolunteer.role}</span>
                  <span className="sd-match-score">{recommendedVolunteer.matchScore}% Match</span>
                </div>
              </div>
              <div className="sd-match-reasons">
                <span><CheckCircle2 size={14} color="var(--success)" /> {recommendedVolunteer.subjects[0]} mentor</span>
                <span><CheckCircle2 size={14} color="var(--success)" /> Nearby ({recommendedVolunteer.distanceKm} km)</span>
                <span><CheckCircle2 size={14} color="var(--success)" /> Available</span>
                <span><CheckCircle2 size={14} color="var(--success)" /> Low current workload</span>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowVolunteerModal(true)}>
                Assign Volunteer
              </button>
            </div>
          )}
        </div>

        <div className="card card-pad">
          <h3 className="section-title">Intervention History</h3>
          <div className="sd-intervention-history">
            {studentInterventions.length === 0 && (
              <p className="sd-empty">No interventions yet.</p>
            )}
            {studentInterventions.map((iv) => (
              <div key={iv.id} className="sd-intervention-item">
                <div className="sd-intervention-icon">
                  <Activity size={16} />
                </div>
                <div className="sd-intervention-content">
                  <div className="sd-intervention-top">
                    <strong>{iv.type}</strong>
                    <span className={`badge ${iv.status === 'Resolved' ? 'badge-low' : iv.status === 'In Progress' ? 'badge-high' : 'badge-moderate'}`}>
                      {iv.status}
                    </span>
                  </div>
                  <span className="sd-intervention-volunteer">{iv.volunteer} · {iv.createdDate}</span>
                  {iv.notes && <p className="sd-intervention-notes">{iv.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="card card-pad">
        <h3 className="section-title">Student Information</h3>
        <div className="sd-info-grid">
          <div className="sd-info-item"><span>Name</span><strong>{student.name}</strong></div>
          <div className="sd-info-item"><span>Age</span><strong>{student.age}</strong></div>
          <div className="sd-info-item"><span>Village</span><strong>{student.village}</strong></div>
          <div className="sd-info-item"><span>School</span><strong>{student.school}</strong></div>
          <div className="sd-info-item"><span>Grade</span><strong>{student.grade}</strong></div>
          <div className="sd-info-item"><span>Parent/Guardian</span><strong>{student.parent} ({student.guardianRelation})</strong></div>
          <div className="sd-info-item"><span>Digital Access</span><strong>{student.digitalAccess ? 'Yes' : 'No'}</strong></div>
          <div className="sd-info-item"><span>Economic Risk</span><strong>{student.economicRisk ? 'Yes' : 'No'}</strong></div>
        </div>
      </div>

      {/* Field Visit Mode */}
      <div className="card card-pad sd-field-visit">
        <h3 className="section-title">Field Visit Report</h3>
        <div className="sd-field-visit-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowFieldVisitModal(true)}>
            <FileText size={15} /> Create Field Visit Report
          </button>
        </div>
        {fieldReport && (
          <div className="sd-field-report fade-in">
            <div className="sd-field-report-header">
              <FileText size={18} />
              <strong>FIELD VISIT REPORT</strong>
            </div>
            <div className="sd-field-report-body">
              <div className="sd-field-report-row"><span>Student:</span> <strong>{fieldReport.student}</strong></div>
              <div className="sd-field-report-row"><span>Date:</span> <strong>{fieldReport.date}</strong></div>
              <div className="sd-field-report-row"><span>Issue:</span> <strong>{fieldReport.issue}</strong></div>
              <div className="sd-field-report-row"><span>Academic concern:</span> <strong>{fieldReport.academicConcern}</strong></div>
              <div className="sd-field-report-row"><span>Recommended action:</span> <strong>{fieldReport.recommendedAction}</strong></div>
              <div className="sd-field-report-row"><span>Next Follow-up:</span> <strong>{fieldReport.nextFollowUp}</strong></div>
              {fieldReport.voice && <div className="sd-field-report-row"><span>Voice note:</span> <strong>Recorded (simulated)</strong></div>}
              {fieldReport.notes && <div className="sd-field-report-row"><span>Notes:</span> <strong>{fieldReport.notes}</strong></div>}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        open={showInterventionModal}
        onClose={() => setShowInterventionModal(false)}
        title="Create Intervention"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowInterventionModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleCreateIntervention}>Create</button>
          </>
        }
      >
        <div className="field">
          <label>Student</label>
          <input className="input" value={student.name} disabled />
        </div>
        <div className="field">
          <label>Intervention Type</label>
          <select className="select" value={interventionType} onChange={(e) => setInterventionType(e.target.value)}>
            <option>Family Visit</option>
            <option>Math Tutoring</option>
            <option>Science Tutoring</option>
            <option>English Tutoring</option>
            <option>Scholarship</option>
            <option>Book Distribution</option>
            <option>Digital Access</option>
            <option>Family Counseling</option>
          </select>
        </div>
        <div className="field">
          <label>Assign Volunteer</label>
          <select className="select" value={interventionVolunteer} onChange={(e) => setInterventionVolunteer(e.target.value)}>
            <option value="">Auto-recommend ({recommendedVolunteer.name})</option>
            {volunteers.map((v) => (
              <option key={v.id} value={v.name}>{v.name} — {v.role}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Notes</label>
          <textarea className="textarea" value={interventionNotes} onChange={(e) => setInterventionNotes(e.target.value)} placeholder="Add notes about this intervention..." />
        </div>
      </Modal>

      <Modal
        open={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
        title="Assign Volunteer"
      >
        <p className="sd-modal-subtitle">Select a volunteer to assign to {student.name}</p>
        <div className="sd-volunteer-pick-list">
          {volunteers.map((v) => (
            <button
              key={v.id}
              className={`sd-volunteer-pick ${v.id === recommendedVolunteer.id ? 'recommended' : ''}`}
              onClick={() => handleAssignVolunteer(v.id)}
            >
              <div className="sd-volunteer-pick-info">
                <strong>{v.name}</strong>
                <span>{v.role} · {v.distanceKm} km · {v.availability}</span>
              </div>
              {v.id === recommendedVolunteer.id && <span className="sd-rec-tag">Best Match</span>}
            </button>
          ))}
        </div>
      </Modal>

      <Modal
        open={showResourceModal}
        onClose={() => setShowResourceModal(false)}
        title="Allocate Resource"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowResourceModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAllocateResource} disabled={!canAllocate}>
              Allocate
            </button>
          </>
        }
      >
        {student.resourceNeed ? (
          <>
            <div className="sd-resource-need">
              <span>Student needs:</span>
              <strong>{student.resourceNeed}</strong>
            </div>
            <div className="sd-resource-avail">
              <span>Available:</span>
              <strong>{resourceData?.available || 0} of {resourceData?.total || 0}</strong>
            </div>
            {resourceAllocated && (
              <p className="sd-resource-done">Resource already allocated to this student.</p>
            )}
            {!canAllocate && !resourceAllocated && (
              <p className="sd-resource-empty">No resources available to allocate.</p>
            )}
          </>
        ) : (
          <p>This student does not currently need a resource.</p>
        )}
      </Modal>

      <Modal
        open={showFieldVisitModal}
        onClose={() => setShowFieldVisitModal(false)}
        title="Field Visit Report"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setShowFieldVisitModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleFieldVisitSubmit}>Generate Report</button>
          </>
        }
      >
        <div className="field">
          <label>Student</label>
          <input className="input" value={student.name} disabled />
        </div>
        <div className="field">
          <label>Visit Date</label>
          <input
            type="date"
            className="input"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Reason for Visit</label>
          <select className="select" value={visitReason} onChange={(e) => setVisitReason(e.target.value)}>
            <option>Attendance Problem</option>
            <option>Academic Problem</option>
            <option>Family Situation</option>
            <option>Financial Problem</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>Notes</label>
          <textarea
            className="textarea"
            value={visitNotes}
            onChange={(e) => setVisitNotes(e.target.value)}
            placeholder="Observations from the visit..."
          />
        </div>
        <button
          className="sd-voice-btn"
          onClick={() => { setVoiceRecorded(true); showToast('Voice recording simulated'); }}
        >
          <Mic size={18} /> {voiceRecorded ? 'Voice note recorded' : 'Record Voice Note'}
        </button>
      </Modal>
    </div>
  );
}

