import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Video, FileText, HelpCircle, BookOpen, PlayCircle,
  CheckCircle2, Clock, Download,
} from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import './Learning.css';

const learningResources = [
  { id: 'lr1', title: 'Mathematics: Algebra Basics', type: 'video', category: 'Mathematics', duration: '24 min', progress: 80, icon: Video, description: 'Learn variables, equations, and solving for x with practical examples.' },
  { id: 'lr2', title: 'Science: Human Body Systems', type: 'video', category: 'Science', duration: '18 min', progress: 45, icon: Video, description: 'Explore the major organ systems and how they work together.' },
  { id: 'lr3', title: 'English Grammar Handbook', type: 'pdf', category: 'English', duration: '42 pages', progress: 100, icon: FileText, description: 'Complete grammar reference covering tenses, parts of speech, and sentence structure.' },
  { id: 'lr4', title: 'Math Quiz: Fractions & Decimals', type: 'quiz', category: 'Mathematics', duration: '15 questions', progress: 60, icon: HelpCircle, description: 'Test your understanding of fractions, decimals, and percentages.' },
  { id: 'lr5', title: 'Science: Plant Biology', type: 'pdf', category: 'Science', duration: '28 pages', progress: 30, icon: FileText, description: 'Learn about photosynthesis, plant structure, and growth cycles.' },
  { id: 'lr6', title: 'English: Reading Comprehension', type: 'video', category: 'English', duration: '32 min', progress: 0, icon: Video, description: 'Improve reading speed and understanding with guided exercises.' },
  { id: 'lr7', title: 'General Knowledge Quiz', type: 'quiz', category: 'General', duration: '20 questions', progress: 75, icon: HelpCircle, description: 'Test knowledge across history, geography, and current affairs.' },
  { id: 'lr8', title: 'Math: Geometry Workbook', type: 'pdf', category: 'Mathematics', duration: '55 pages', progress: 50, icon: FileText, description: 'Practice problems on angles, triangles, circles, and area.' },
  { id: 'lr9', title: 'Digital Literacy: Using Tablets', type: 'video', category: 'Digital', duration: '15 min', progress: 90, icon: Video, description: 'Learn how to use a tablet for learning, browsing, and accessing resources.' },
];

const categories = ['All', 'Mathematics', 'Science', 'English', 'General', 'Digital'];
const types = ['All', 'video', 'pdf', 'quiz'];

const typeConfig = {
  video: { label: 'Video', color: 'var(--primary)', bg: 'var(--primary-50)' },
  pdf: { label: 'PDF', color: 'var(--danger)', bg: 'var(--danger-light)' },
  quiz: { label: 'Quiz', color: 'var(--secondary)', bg: 'var(--secondary-light)' },
};

export default function Learning() {
  const { search: globalSearch } = useOutletContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');

  const effectiveSearch = globalSearch || search;

  const filtered = useMemo(() => {
    return learningResources.filter((r) => {
      const q = effectiveSearch.toLowerCase();
      const matchesSearch = !q || r.title.toLowerCase().includes(q);
      const matchesCat = category === 'All' || r.category === category;
      const matchesType = type === 'All' || r.type === type;
      return matchesSearch && matchesCat && matchesType;
    });
  }, [effectiveSearch, category, type]);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="page-title">Learning Resources</h1>
        <p className="page-subtitle">{filtered.length} resources available for students</p>
      </div>

      <div className="learning-toolbar">
        <SearchBar
          value={effectiveSearch}
          onChange={setSearch}
          placeholder="Search resources..."
        />
        <div className="learning-filter-group">
          <div className="learning-filters">
            {categories.map((c) => (
              <button
                key={c}
                className={`learning-filter ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="learning-filters">
            {types.map((t) => (
              <button
                key={t}
                className={`learning-filter ${type === t ? 'active' : ''}`}
                onClick={() => setType(t)}
              >
                {t === 'All' ? 'All Types' : typeConfig[t].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-3">
        {filtered.map((r) => {
          const tc = typeConfig[r.type];
          const Icon = r.icon;
          return (
            <div key={r.id} className="learning-card card card-hover card-pad">
              <div className="learning-card-top">
                <span className="learning-card-icon" style={{ background: tc.bg, color: tc.color }}>
                  <Icon size={22} />
                </span>
                <span className="learning-type-badge" style={{ background: tc.bg, color: tc.color }}>
                  {tc.label}
                </span>
              </div>
              <h3 className="learning-card-title">{r.title}</h3>
              <p className="learning-card-desc">{r.description}</p>
              <div className="learning-card-meta">
                <span><BookOpen size={13} /> {r.category}</span>
                <span><Clock size={13} /> {r.duration}</span>
              </div>
              <div className="learning-card-progress">
                <div className="learning-progress-bar">
                  <div
                    className="learning-progress-fill"
                    style={{
                      width: `${r.progress}%`,
                      background: r.progress === 100 ? 'var(--success)' : 'var(--primary)',
                    }}
                  />
                </div>
                <span className="learning-progress-label">
                  {r.progress === 100 ? (
                    <><CheckCircle2 size={14} color="var(--success)" /> Completed</>
                  ) : (
                    `${r.progress}% complete`
                  )}
                </span>
              </div>
              <div className="learning-card-actions">
                <button className="btn btn-primary btn-sm">
                  {r.type === 'video' ? <><PlayCircle size={15} /> Watch</> :
                   r.type === 'quiz' ? <><HelpCircle size={15} /> Start Quiz</> :
                   <><FileText size={15} /> Read</>}
                </button>
                {r.type !== 'quiz' && (
                  <button className="btn btn-secondary btn-sm">
                    <Download size={15} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="learning-empty">No resources found matching your filters.</div>
      )}
    </div>
  );
}
