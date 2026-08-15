import { Tablet, BookOpen, Award, Users, Pencil, Wifi, Package } from 'lucide-react';
import './ResourceCard.css';

const iconMap = {
  tablet: Tablet,
  book: BookOpen,
  award: Award,
  users: Users,
  pencil: Pencil,
  wifi: Wifi,
};

export default function ResourceCard({ resource }) {
  const Icon = iconMap[resource.icon] || Package;
  const percent = resource.total > 0 ? (resource.available / resource.total) * 100 : 0;

  return (
    <div className="resource-card card card-pad">
      <div className="resource-card-top">
        <span className="resource-icon">
          <Icon size={22} />
        </span>
        <span className="resource-category">{resource.category}</span>
      </div>
      <h3 className="resource-name">{resource.name}</h3>
      <div className="resource-numbers">
        <span className="resource-available">{resource.available}</span>
        <span className="resource-total">/ {resource.total} available</span>
      </div>
      <div className="resource-bar">
        <div className="resource-bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
