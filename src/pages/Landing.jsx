import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowRight, ShieldAlert, Brain, MapPin, Package,
  Users, Wifi, TrendingUp, GraduationCap, Heart, CheckCircle2,
} from 'lucide-react';
import './Landing.css';

const heroImage = 'https://images.pexels.com/photos/36746078/pexels-photo-36746078.jpeg?auto=compress&cs=tinysrgb&h=1600&w=2400';
const missionImage = 'https://images.pexels.com/photos/3231359/pexels-photo-3231359.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800';
const storyImage = 'https://images.pexels.com/photos/35558791/pexels-photo-35558791.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800';
const volunteerImage = 'https://images.pexels.com/photos/18012456/pexels-photo-18012456.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800';

const programs = [
  { icon: ShieldAlert, index: '01', title: 'Early warning', desc: 'Spot attendance, learning, and economic signals before a student slips beyond reach.', accent: 'green' },
  { icon: Brain, index: '02', title: 'Targeted action', desc: 'Turn a risk score into a clear next step for every child, family, and field team.', accent: 'gold' },
  { icon: Users, index: '03', title: 'Local support', desc: 'Bring the right volunteer, resource, or home visit to the students who need it most.', accent: 'blue' },
  { icon: TrendingUp, index: '04', title: 'Measured impact', desc: 'See attendance recover, learning grow, and interventions become lasting change.', accent: 'rust' },
];

const stats = [
  { value: '1,248', label: 'students supported' },
  { value: '86', label: 'students protected' },
  { value: '43', label: 'active interventions' },
  { value: '17', label: 'dropouts prevented' },
];

export default function Landing() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <nav className="landing-nav">
          <Link to="/" className="landing-brand">
            <span className="landing-brand-mark"><GraduationCap size={20} /></span>
            <span className="landing-brand-name">Saksham</span>
            <span className="landing-brand-type">RURAL EDUCATION ALLIANCE</span>
          </Link>
          <div className="landing-nav-links">
            <a href="#mission">Mission</a>
            <a href="#programs">Programs</a>
            <a href="#impact">Impact</a>
            <a href="#stories">Stories</a>
            <a href="#involved">Get Involved</a>
            <Link to="/login" className="landing-nav-cta">Sign in <ArrowUpRight size={15} /></Link>
          </div>
          <Link to="/login" className="landing-mobile-cta">Open platform</Link>
        </nav>

        <div className="landing-hero-media" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="landing-hero-overlay" />
          <div className="landing-hero-content">
            <div className="landing-hero-copy">
              <span className="landing-eyebrow landing-eyebrow-light">The future of rural education is proactive.</span>
              <h1>Keep every<br /><em>child learning.</em></h1>
              <p>
                Saksham helps local teams see the warning signs, understand the story behind them,
                and act before a student is lost to dropout.
              </p>
              <div className="landing-hero-buttons">
                <Link to="/app/dashboard" className="landing-button landing-button-gold">Explore Saksham <ArrowRight size={17} /></Link>
                <a href="#mission" className="landing-text-link landing-text-link-light">Our mission <ArrowRight size={15} /></a>
              </div>
            </div>
            <div className="landing-hero-note">
              <span className="landing-hero-note-line" />
              <span>Built with NGOs,<br />for rural communities.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-impact-band" id="impact">
        <div className="landing-impact-inner">
          {stats.map((stat) => (
            <div key={stat.label} className="landing-impact-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-story landing-section" id="mission">
        <div className="landing-story-grid">
          <div className="landing-story-copy">
            <span className="landing-eyebrow">Our mission</span>
            <h2>Every child deserves a fair chance to <em>stay in school.</em></h2>
            <p>
              In rural India, leaving school is rarely a single decision. It is a slow accumulation of missed days,
              falling grades, a family in crisis, or a child without the tools to keep up.
            </p>
            <p>
              Saksham makes those moments visible early. We give NGO teams one clear view of risk, context,
              action, and outcome — so the right person can help at the right time.
            </p>
            <div className="landing-story-signature">
              <span className="landing-signature-mark"><Heart size={16} /></span>
              <div><strong>Care, made actionable.</strong><span>For the next generation of rural learners.</span></div>
            </div>
          </div>
          <div className="landing-story-image-wrap">
            <img src={missionImage} alt="Students learning together in a rural classroom" className="landing-story-image" />
            <div className="landing-image-caption">Learning begins with being seen.</div>
          </div>
        </div>
      </section>

      <section className="landing-programs landing-section" id="programs">
        <div className="landing-section-topline">
          <div>
            <span className="landing-eyebrow">What we do</span>
            <h2>One platform.<br /><em>A complete response.</em></h2>
          </div>
          <p>From the first risk signal to the moment a student is thriving again, Saksham keeps the whole journey connected.</p>
        </div>
        <div className="landing-program-grid">
          {programs.map((program) => (
            <article key={program.title} className={`landing-program-card landing-program-${program.accent}`}>
              <div className="landing-program-top">
                <span className="landing-program-icon"><program.icon size={23} /></span>
                <span className="landing-program-index">{program.index}</span>
              </div>
              <h3>{program.title}</h3>
              <p>{program.desc}</p>
              <Link to="/app/dashboard" className="landing-card-link">See how it works <ArrowUpRight size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-quote-section">
        <div className="landing-quote-mark">“</div>
        <blockquote>We do not just ask who is struggling. We ask <em>what would help them stay.</em></blockquote>
        <span className="landing-quote-rule" />
        <span className="landing-quote-byline">The Saksham approach</span>
      </section>

      <section className="landing-results landing-section" id="stories">
        <div className="landing-section-topline">
          <div>
            <span className="landing-eyebrow">On the ground</span>
            <h2>Small actions.<br /><em>Lasting change.</em></h2>
          </div>
          <Link to="/app/impact" className="landing-text-link">View our impact <ArrowRight size={15} /></Link>
        </div>
        <div className="landing-results-grid">
          <article className="landing-result-card landing-result-tall">
            <img src={storyImage} alt="Students writing together at a village school" />
            <div className="landing-result-overlay" />
            <div className="landing-result-copy">
              <span className="landing-result-tag">A story from Rampur</span>
              <h3>When showing up became possible again.</h3>
              <p>Rahul's attendance rose from 54% to 84% after a family visit, a math mentor, and offline learning materials.</p>
              <Link to="/app/students/s1" className="landing-result-link">Read Rahul's story <ArrowRight size={15} /></Link>
            </div>
          </article>
          <article className="landing-result-card">
            <img src={volunteerImage} alt="A student and volunteers supporting a community learning activity" />
            <div className="landing-result-overlay" />
            <div className="landing-result-copy">
              <span className="landing-result-tag">Community first</span>
              <h3>The right support is often nearby.</h3>
              <Link to="/app/volunteers" className="landing-result-link">Meet our volunteers <ArrowRight size={15} /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="landing-involved" id="involved">
        <div className="landing-involved-copy">
          <span className="landing-eyebrow landing-eyebrow-light">Join the movement</span>
          <h2>Stay curious.<br /><em>Stay committed.</em></h2>
          <p>Whether you are an NGO leader, a teacher, or a volunteer in the field, there is a place for you in this work.</p>
          <div className="landing-hero-buttons">
            <Link to="/login" className="landing-button landing-button-gold">Open the platform <ArrowUpRight size={17} /></Link>
            <Link to="/app/volunteers" className="landing-text-link landing-text-link-light">Become a volunteer <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-top">
          <Link to="/" className="landing-brand">
            <span className="landing-brand-mark"><GraduationCap size={20} /></span>
            <span className="landing-brand-name">Saksham</span>
            <span className="landing-brand-type">RURAL EDUCATION ALLIANCE</span>
          </Link>
          <div className="landing-footer-links">
            <a href="#mission">Mission</a><a href="#programs">Programs</a><a href="#impact">Impact</a><Link to="/login">Sign in</Link>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <span>© 2024 Saksham. Built for every child who wants to keep learning.</span>
          <span>Made with care in rural India.</span>
        </div>
      </footer>
    </div>
  );
}
