import { MapPin, Clock, Users, Phone } from 'lucide-react';
import './VolunteerCard.css';

export default function VolunteerCard({ volunteer, onAssign }) {
  const isAvailable = volunteer.availability === 'Today';
  return (
    <div className="volunteer-card card card-pad">
      <div className="volunteer-card-top">
        <div className="volunteer-avatar">
          {volunteer.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
        </div>
        <div className="volunteer-info">
          <h3 className="volunteer-name">{volunteer.name}</h3>
          <span className="volunteer-role">{volunteer.role}</span>
        </div>
        <span className={`badge ${isAvailable ? 'badge-low' : 'badge-moderate'}`}>
          {volunteer.availability}
        </span>
      </div>

      <div className="volunteer-meta">
        <span className="volunteer-meta-item">
          <MapPin size={14} /> {volunteer.distanceKm} km away
        </span>
        <span className="volunteer-meta-item">
          <Users size={14} /> {volunteer.studentsAssigned} assigned
        </span>
        <span className="volunteer-meta-item">
          <Phone size={14} /> {volunteer.phone}
        </span>
      </div>

      <div className="volunteer-subjects">
        {volunteer.subjects.map((s) => (
          <span key={s} className="volunteer-subject-tag">{s}</span>
        ))}
      </div>

      {onAssign && (
        <button className="btn btn-primary btn-sm volunteer-assign-btn" onClick={() => onAssign(volunteer)}>
          Assign Student
        </button>
      )}
    </div>
  );
}
