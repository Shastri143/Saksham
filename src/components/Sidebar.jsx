import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Activity, HandHeart, Package,
  MapPin, TrendingUp, Settings, LogOut, GraduationCap, X,
  Calendar, BookOpen, ShieldAlert,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/students', label: 'Students', icon: Users },
  { to: '/app/attendance', label: 'Attendance', icon: Calendar },
  { to: '/app/learning', label: 'Learning', icon: BookOpen },
  { to: '/app/interventions', label: 'Interventions', icon: Activity },
  { to: '/app/risk-alerts', label: 'Risk Alerts', icon: ShieldAlert },
  { to: '/app/volunteers', label: 'Volunteers', icon: HandHeart },
  { to: '/app/resources', label: 'Resources', icon: Package },
  { to: '/app/villages', label: 'Villages', icon: MapPin },
  { to: '/app/impact', label: 'Impact', icon: TrendingUp },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <span className="sidebar-logo">
              <GraduationCap size={22} color="#fff" />
            </span>
            <span className="sidebar-brand-name">Saksham</span>
          </Link>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to ||
              (item.to !== '/app/dashboard' && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <item.icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link sidebar-logout">
            <LogOut size={19} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
