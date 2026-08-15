const config = {
  low: { label: 'Low', dot: 'dot-low', badge: 'badge-low' },
  moderate: { label: 'Moderate', dot: 'dot-moderate', badge: 'badge-moderate' },
  high: { label: 'High', dot: 'dot-high', badge: 'badge-high' },
  critical: { label: 'Critical', dot: 'dot-critical', badge: 'badge-critical' },
};

export default function RiskBadge({ level, showDot = true }) {
  const c = config[level] || config.low;
  return (
    <span className={`badge ${c.badge}`}>
      {showDot && <span className={`badge-dot ${c.dot}`} />}
      {c.label}
    </span>
  );
}
