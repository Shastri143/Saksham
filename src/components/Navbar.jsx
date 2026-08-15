import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import NotificationPanel from './NotificationPanel.jsx';
import './Navbar.css';

export default function Navbar({ onMenuClick, search, onSearch }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="topbar">
      <button className="topbar-menu" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="topbar-search">
        <Search size={18} className="topbar-search-icon" />
        <input
          type="text"
          placeholder="Search students, villages, volunteers..."
          value={search || ''}
          onChange={(e) => onSearch?.(e.target.value)}
          className="topbar-search-input"
        />
      </div>

      <div className="topbar-actions">
        <div className="topbar-notif" ref={notifRef}>
          <button
            className="topbar-icon-btn"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="topbar-notif-dot" />
          </button>
          {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
        </div>

        <div className="topbar-profile" ref={profileRef}>
          <button
            className="topbar-profile-btn"
            onClick={() => setProfileOpen((v) => !v)}
          >
            <span className="topbar-avatar">AS</span>
            <span className="topbar-profile-name">Admin</span>
            <ChevronDown size={16} />
          </button>
          {profileOpen && (
            <div className="topbar-dropdown scale-in">
              <div className="topbar-dropdown-header">
                <strong>Asha Singh</strong>
                <span>NGO Admin</span>
              </div>
              <button
                className="topbar-dropdown-item"
                onClick={() => { setProfileOpen(false); navigate('/app/settings'); }}
              >
                Settings
              </button>
              <button
                className="topbar-dropdown-item topbar-dropdown-logout"
                onClick={() => { setProfileOpen(false); navigate('/'); }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
