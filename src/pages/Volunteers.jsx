import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import VolunteerCard from '../components/VolunteerCard.jsx';
import Modal from '../components/Modal.jsx';
import { volunteers } from '../data/volunteers.js';
import { students } from '../data/students.js';
import './Volunteers.css';

export default function Volunteers() {
  const { search: globalSearch } = useOutletContext();
  const [search, setSearch] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [assignModalVolunteer, setAssignModalVolunteer] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState({});
  const [toast, setToast] = useState(null);

  const effectiveSearch = globalSearch || search;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = useMemo(() => {
    return volunteers.filter((v) => {
      const q = effectiveSearch.toLowerCase();
      const matchesSearch = !q ||
        v.name.toLowerCase().includes(q) ||
        v.role.toLowerCase().includes(q) ||
        v.village.toLowerCase().includes(q);
      const matchesAvail = availabilityFilter === 'All' ||
        (availabilityFilter === 'Available' && v.availability === 'Today') ||
        (availabilityFilter === 'Unavailable' && v.availability !== 'Today');
      return matchesSearch && matchesAvail;
    });
  }, [effectiveSearch, availabilityFilter]);

  const handleAssign = (volunteer) => {
    setAssignModalVolunteer(volunteer);
  };

  const handleSelectStudent = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setAssignedStudents((prev) => ({
      ...prev,
      [assignModalVolunteer.id]: [...(prev[assignModalVolunteer.id] || []), student.name],
    }));
    setAssignModalVolunteer(null);
    showToast(`${student.name} assigned to ${assignModalVolunteer.name}`);
  };

  const unassignedStudents = students.filter(
    (s) => !s.assignedVolunteer && s.riskLevel !== 'low',
  );

  return (
    <div className="page fade-in">
      {toast && <div className="toast toast-success">{toast}</div>}

      <div className="page-header">
        <h1 className="page-title">Volunteers</h1>
        <p className="page-subtitle">{filtered.length} volunteers across all villages</p>
      </div>

      <div className="volunteers-toolbar">
        <SearchBar
          value={effectiveSearch}
          onChange={setSearch}
          placeholder="Search by name, role, or village..."
        />
        <div className="volunteers-filters">
          {['All', 'Available', 'Unavailable'].map((f) => (
            <button
              key={f}
              className={`volunteers-filter ${availabilityFilter === f ? 'active' : ''}`}
              onClick={() => setAvailabilityFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-3">
        {filtered.map((v) => (
          <div key={v.id} className="volunteers-card-wrap">
            <VolunteerCard volunteer={v} onAssign={handleAssign} />
            {assignedStudents[v.id]?.length > 0 && (
              <div className="volunteers-assigned-list">
                <span className="volunteers-assigned-label">Recently assigned:</span>
                {assignedStudents[v.id].map((name, i) => (
                  <span key={i} className="volunteers-assigned-tag">{name}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        open={!!assignModalVolunteer}
        onClose={() => setAssignModalVolunteer(null)}
        title={`Assign student to ${assignModalVolunteer?.name || ''}`}
      >
        <p className="volunteers-modal-subtitle">
          Select a student who needs support. Showing students without a volunteer.
        </p>
        <div className="volunteers-student-list">
          {unassignedStudents.map((s) => (
            <button
              key={s.id}
              className="volunteers-student-pick"
              onClick={() => handleSelectStudent(s.id)}
            >
              <div className="volunteers-student-info">
                <strong>{s.name}</strong>
                <span>{s.village} · Grade {s.grade} · Risk: {s.riskScore}/100</span>
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
