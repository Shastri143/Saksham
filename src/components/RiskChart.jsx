import './RiskChart.css';

const colorFor = (score) => {
  if (score >= 81) return '#DC2626';
  if (score >= 61) return '#F97316';
  if (score >= 31) return '#F59E0B';
  return '#16A34A';
};

export default function RiskChart({ score = 0, size = 120 }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = colorFor(score);

  return (
    <div className="risk-chart" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="risk-chart-svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="risk-chart-progress"
          style={{ '--chart-size': size }}
        />
      </svg>
      <div className="risk-chart-label">
        <span className="risk-chart-score" style={{ color }}>{score}</span>
        <span className="risk-chart-max">/100</span>
      </div>
    </div>
  );
}
