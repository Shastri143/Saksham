import { useEffect, useRef, useState } from 'react';
import './StatCard.css';

export default function StatCard({ label, value, icon: Icon, color = 'primary', suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const target = Number(value) || 0;
  const rafRef = useRef(null);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    const startVal = display;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + (target - startVal) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        {Icon && (
          <span className="stat-icon">
            <Icon size={20} />
          </span>
        )}
      </div>
      <div className="stat-value">
        {display.toLocaleString()}{suffix}
      </div>
    </div>
  );
}
