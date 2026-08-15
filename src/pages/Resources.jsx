import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, AlertCircle, CheckCircle2 } from 'lucide-react';
import ResourceCard from '../components/ResourceCard.jsx';
import RiskBadge from '../components/RiskBadge.jsx';
import { resources as initialResources, resourceRequests } from '../data/resources.js';
import './Resources.css';

export default function Resources() {
  const [resources, setResources] = useState(initialResources.map((r) => ({ ...r })));
  const [allocatedRequests, setAllocatedRequests] = useState(new Set());
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAllocate = (request) => {
    const resource = resources.find((r) => r.name === request.need);
    if (!resource || resource.available <= 0) return;

    setResources((prev) =>
      prev.map((r) =>
        r.name === request.need
          ? { ...r, available: r.available - 1 }
          : r,
      ),
    );
    setAllocatedRequests((prev) => new Set([...prev, request.id]));
    showToast(`${request.need} allocated to ${request.studentName}`);
  };

  return (
    <div className="page fade-in">
      {toast && <div className="toast toast-success">{toast}</div>}

      <div className="page-header">
        <h1 className="page-title">Resources</h1>
        <p className="page-subtitle">Smart allocation of learning materials and support</p>
      </div>

      <h2 className="section-title">Available Resources</h2>
      <div className="grid grid-3 resources-grid">
        {resources.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>

      <h2 className="section-title resources-needs-title">Students Needing Resources</h2>
      <div className="resources-requests">
        {resourceRequests.map((req) => {
          const resource = resources.find((r) => r.name === req.need);
          const isAllocated = allocatedRequests.has(req.id);
          const canAllocate = resource && resource.available > 0 && !isAllocated;

          return (
            <div key={req.id} className="resources-request card card-pad">
              <div className="resources-request-info">
                <Link to={`/app/students/${req.studentId}`} className="resources-request-name">
                  {req.studentName}
                </Link>
                <span className="resources-request-village">{req.village}</span>
              </div>
              <div className="resources-request-need">
                <Package size={16} />
                <span>Need: <strong>{req.need}</strong></span>
              </div>
              <div className="resources-request-priority">
                <RiskBadge level={req.priority} showDot={false} />
              </div>
              <div className="resources-request-reason">
                <AlertCircle size={14} />
                <span>{req.reason}</span>
              </div>
              <div className="resources-request-action">
                {isAllocated ? (
                  <span className="resources-allocated">
                    <CheckCircle2 size={16} color="var(--success)" /> Allocated
                  </span>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAllocate(req)}
                    disabled={!canAllocate}
                  >
                    Allocate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
