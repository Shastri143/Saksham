import { useNavigate } from 'react-router-dom';
import { notifications } from '../data/students.js';
import './NotificationPanel.css';

export default function NotificationPanel({ onClose }) {
  const navigate = useNavigate();

  const handleClick = (link) => {
    onClose();
    navigate(link);
  };

  return (
    <div className="notif-panel scale-in">
      <div className="notif-header">
        <strong>Notifications</strong>
        <span className="notif-count">{notifications.length}</span>
      </div>
      <div className="notif-list">
        {notifications.map((n) => (
          <button
            key={n.id}
            className={`notif-item notif-${n.type}`}
            onClick={() => handleClick(n.link)}
          >
            <span className="notif-icon">{n.icon}</span>
            <span className="notif-text">{n.text}</span>
          </button>
        ))}
      </div>
      <button className="notif-footer" onClick={onClose}>
        Mark all as read
      </button>
    </div>
  );
}
