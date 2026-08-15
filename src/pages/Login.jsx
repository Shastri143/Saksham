import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Users, ArrowRight, ArrowUpRight } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('admin@saksham.org');
  const [password, setPassword] = useState('demo1234');
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/app/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <Link to="/" className="login-brand">
          <span className="login-logo">
            <GraduationCap size={20} color="#fff" />
          </span>
          <span className="login-brand-name">Saksham</span>
          <span className="login-brand-type">RURAL EDUCATION ALLIANCE</span>
        </Link>
        <div className="login-hero-text">
          <span className="login-eyebrow">Welcome back</span>
          <h1>Sign in to keep<br /><em>every child learning.</em></h1>
          <p>Identify at-risk students, assign interventions, and track impact across your villages — all in one place.</p>
          <div className="login-hero-stats">
            <div><strong>1,248</strong><span>Students</span></div>
            <div><strong>86</strong><span>At Risk</span></div>
            <div><strong>17</strong><span>Prevented</span></div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Sign in</h2>
          <p className="login-subtitle">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field">
              <label htmlFor="email">Email or phone</label>
              <div className="login-input-wrap">
                <Mail size={18} />
                <input
                  id="email"
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@ngo.org"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrap">
                <Lock size={18} />
                <input
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>I am a...</label>
              <div className="login-roles">
                <button
                  type="button"
                  className={`login-role ${role === 'admin' ? 'active' : ''}`}
                  onClick={() => setRole('admin')}
                >
                  <Users size={16} /> NGO Admin
                </button>
                <button
                  type="button"
                  className={`login-role ${role === 'teacher' ? 'active' : ''}`}
                  onClick={() => setRole('teacher')}
                >
                  <Users size={16} /> Teacher / Volunteer
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit">
              Login <ArrowRight size={18} />
            </button>
          </form>

          <p className="login-hint">
            Demo mode — any credentials will work. Click Login to explore the platform.
          </p>
          <Link to="/" className="login-back">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
