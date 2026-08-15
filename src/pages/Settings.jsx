import { useState } from 'react';
import { User, Bell, Shield, Palette, Save } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const [name, setName] = useState('Asha Singh');
  const [email, setEmail] = useState('admin@saksham.org');
  const [org, setOrg] = useState('Saksham Foundation');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [riskThreshold, setRiskThreshold] = useState('60');
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast('Settings saved successfully');
  };

  return (
    <div className="page fade-in">
      {toast && <div className="toast toast-success">{toast}</div>}

      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and platform preferences</p>
      </div>

      <div className="settings-grid">
        <div className="card card-pad settings-section">
          <div className="settings-section-header">
            <span className="settings-section-icon"><User size={20} /></span>
            <h3 className="section-title" style={{ margin: 0 }}>Profile</h3>
          </div>
          <div className="field">
            <label>Full Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label>Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Organization</label>
            <input className="input" value={org} onChange={(e) => setOrg(e.target.value)} />
          </div>
          <div className="field">
            <label>Phone</label>
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div className="card card-pad settings-section">
          <div className="settings-section-header">
            <span className="settings-section-icon"><Bell size={20} /></span>
            <h3 className="section-title" style={{ margin: 0 }}>Notifications</h3>
          </div>
          <div className="settings-toggle">
            <div className="settings-toggle-info">
              <strong>Email Notifications</strong>
              <span>Receive alerts about at-risk students</span>
            </div>
            <button
              className={`settings-switch ${notifEmail ? 'on' : ''}`}
              onClick={() => setNotifEmail(!notifEmail)}
              aria-label="Toggle email notifications"
            >
              <span className="settings-switch-knob" />
            </button>
          </div>
          <div className="settings-toggle">
            <div className="settings-toggle-info">
              <strong>Push Notifications</strong>
              <span>Real-time alerts in your browser</span>
            </div>
            <button
              className={`settings-switch ${notifPush ? 'on' : ''}`}
              onClick={() => setNotifPush(!notifPush)}
              aria-label="Toggle push notifications"
            >
              <span className="settings-switch-knob" />
            </button>
          </div>
          <div className="settings-toggle">
            <div className="settings-toggle-info">
              <strong>SMS Alerts</strong>
              <span>Text messages for critical alerts</span>
            </div>
            <button
              className={`settings-switch ${notifSms ? 'on' : ''}`}
              onClick={() => setNotifSms(!notifSms)}
              aria-label="Toggle SMS alerts"
            >
              <span className="settings-switch-knob" />
            </button>
          </div>
        </div>

        <div className="card card-pad settings-section">
          <div className="settings-section-header">
            <span className="settings-section-icon"><Shield size={20} /></span>
            <h3 className="section-title" style={{ margin: 0 }}>Risk Alert Threshold</h3>
          </div>
          <p className="settings-section-desc">
            Set the minimum risk score that triggers an alert. Students below this threshold
            will not appear in the Risk Alerts page.
          </p>
          <div className="field">
            <label>Risk Score Threshold: {riskThreshold}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={riskThreshold}
              onChange={(e) => setRiskThreshold(e.target.value)}
              className="settings-slider"
            />
            <div className="settings-slider-labels">
              <span>0 (All)</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className="card card-pad settings-section">
          <div className="settings-section-header">
            <span className="settings-section-icon"><Palette size={20} /></span>
            <h3 className="section-title" style={{ margin: 0 }}>Appearance</h3>
          </div>
          <div className="settings-theme-options">
            <button
              className={`settings-theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              <span className="settings-theme-preview light" />
              <span>Light</span>
            </button>
            <button
              className={`settings-theme-option ${theme === 'blue' ? 'active' : ''}`}
              onClick={() => setTheme('blue')}
            >
              <span className="settings-theme-preview blue" />
              <span>Blue Tint</span>
            </button>
            <button
              className={`settings-theme-option ${theme === 'green' ? 'active' : ''}`}
              onClick={() => setTheme('green')}
            >
              <span className="settings-theme-preview green" />
              <span>Green Tint</span>
            </button>
          </div>
        </div>
      </div>

      <div className="settings-save-bar">
        <button className="btn btn-primary btn-lg" onClick={handleSave}>
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
}
