import { Sparkles, AlertCircle, Clock, TrendingUp } from 'lucide-react';

export default function AISummaryPanel() {
  // Phase 1: Read-only AI summary - no actions, no suggestions, no workflow
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h6 className="mb-0">AI Insights</h6>
        </div>
        
        <div className="small">
          <div className="mb-3">
            <div className="d-flex align-items-start gap-2 mb-2">
              <AlertCircle size={16} className="text-warning mt-1 flex-shrink-0" />
              <div>
                <strong>2 major works require attention</strong>
                <div className="text-muted">Cladding Major Works Dockside and Riverside Roof have upcoming deadlines</div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-start gap-2 mb-2">
              <Clock size={16} className="text-info mt-1 flex-shrink-0" />
              <div>
                <strong>Average major works duration: 14 weeks</strong>
                <div className="text-muted">Based on completed Section 20 consultations</div>
              </div>
            </div>
          </div>

          <div className="mb-0">
            <div className="d-flex align-items-start gap-2">
              <TrendingUp size={16} className="text-success mt-1 flex-shrink-0" />
              <div>
                <strong>Portfolio health: Good</strong>
                <div className="text-muted">8 major works in progress, 5 completed this quarter</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
