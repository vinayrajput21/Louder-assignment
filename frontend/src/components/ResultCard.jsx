const styles = `
  .result-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    animation: fadeSlideUp 0.4s cubic-bezier(0.2,0,0,1);
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .result-header {
    padding: 20px 28px 18px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: linear-gradient(135deg, var(--surface2) 0%, var(--surface) 100%);
  }
  .result-header-left { display: flex; align-items: center; gap: 12px; }
  .result-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--accent-dim); border: 1px solid rgba(201,147,58,0.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent); flex-shrink: 0;
  }
  .result-header-title {
    font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text);
  }
  .result-new-badge {
    font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
    color: #3db87a; background: rgba(61,184,122,0.1); border: 1px solid rgba(61,184,122,0.25);
    padding: 3px 10px; border-radius: 100px;
  }
  .result-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 16px; }
  .result-venue-name {
    font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--text);
    line-height: 1.1; letter-spacing: -0.01em;
  }
  .result-fields { display: flex; flex-direction: column; gap: 12px; }
  .result-field { display: flex; gap: 12px; align-items: flex-start; }
  .field-icon-wrap {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--surface2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: var(--accent); margin-top: 1px;
  }
  .field-content { flex: 1; }
  .field-label {
    font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 3px;
  }
  .field-value { font-size: 14.5px; font-weight: 400; color: var(--text-soft); line-height: 1.55; }
  .field-value--accent {
    font-size: 17px; font-weight: 500; color: var(--accent2);
    font-family: var(--font-display); letter-spacing: -0.01em;
  }
  .result-why {
    background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 16px 18px; font-size: 13.5px; color: var(--text-soft); line-height: 1.7;
    border-left: 3px solid var(--accent);
  }
  .result-why-label {
    font-size: 10px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 8px;
  }
`;

const MapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M7.5 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M7.5 1.5C5 1.5 3 3.5 3 6c0 3.5 4.5 7.5 4.5 7.5S12 9.5 12 6c0-2.5-2-4.5-4.5-4.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CostIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="7.5" cy="7.5" r="6" /><path d="M7.5 4.5v6M5.5 6.5c0-.8.9-1.5 2-1.5s2 .7 2 1.5c0 .9-2 1.5-2 1.5s-2 .6-2 1.5c0 .8.9 1.5 2 1.5s2-.7 2-1.5" strokeLinecap="round"/>
  </svg>
);
const VenueIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="7" width="12" height="8" rx="1" /><path d="M1 7l7-5 7 5" strokeLinecap="round" strokeLinejoin="round" /><rect x="6" y="9" width="4" height="6" />
  </svg>
);

const ResultCard = ({ proposal }) => {
  if (!proposal) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="result-card">
        <div className="result-header">
          <div className="result-header-left">
            <div className="result-icon">
              <VenueIcon />
            </div>
            <span className="result-header-title">Suggested Venue</span>
          </div>
          <span className="result-new-badge">New</span>
        </div>
        <div className="result-body">
          <div className="result-venue-name">{proposal.venueName}</div>
          <div className="result-fields">
            <div className="result-field">
              <div className="field-icon-wrap"><MapIcon /></div>
              <div className="field-content">
                <div className="field-label">Location</div>
                <div className="field-value">{proposal.location}</div>
              </div>
            </div>
            <div className="result-field">
              <div className="field-icon-wrap"><CostIcon /></div>
              <div className="field-content">
                <div className="field-label">Estimated Cost</div>
                <div className="field-value field-value--accent">{proposal.estimatedCost}</div>
              </div>
            </div>
          </div>
          <div className="result-why">
            <div className="result-why-label">Why it fits</div>
            {proposal.whyItFits}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultCard;