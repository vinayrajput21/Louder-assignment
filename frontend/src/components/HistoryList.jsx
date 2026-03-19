const styles = `
  .history-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
  }
  .history-header {
    padding: 20px 24px 18px;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
    display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
  }
  .history-title-row { display: flex; align-items: center; gap: 10px; }
  .history-title-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(201,147,58,0.08); border: 1px solid rgba(201,147,58,0.18);
    display: flex; align-items: center; justify-content: center; color: var(--accent);
  }
  .history-title {
    font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text);
  }
  .history-count {
    font-size: 11px; font-weight: 500;
    color: var(--muted); background: var(--surface);
    border: 1px solid var(--border); padding: 3px 9px; border-radius: 100px;
  }
  .history-scroll {
    overflow-y: auto; flex: 1; padding: 16px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .history-scroll::-webkit-scrollbar { width: 4px; }
  .history-scroll::-webkit-scrollbar-track { background: transparent; }
  .history-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
  .history-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    flex: 1; gap: 12px; padding: 40px 24px; text-align: center;
  }
  .history-empty-icon {
    width: 48px; height: 48px; border-radius: 14px;
    background: var(--surface2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; color: var(--muted);
  }
  .history-empty-text { font-size: 14px; color: var(--muted); font-weight: 300; line-height: 1.6; }
  .history-item {
    background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 16px 18px; cursor: default;
    transition: border-color var(--transition), background var(--transition);
  }
  .history-item:hover { border-color: var(--border-hover); background: #1f1f25; }
  .history-item-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
  .history-item-query {
    font-size: 13.5px; color: var(--text-soft); line-height: 1.55; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .history-item-idx {
    font-size: 11px; color: var(--muted); background: var(--surface);
    border: 1px solid var(--border); padding: 2px 7px; border-radius: 6px;
    flex-shrink: 0; margin-top: 1px; font-family: monospace;
  }
  .history-item-meta {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  }
  .meta-chip {
    display: flex; align-items: flex-start; gap: 7px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; padding: 8px 10px;
  }
  .meta-chip-icon { color: var(--accent); flex-shrink: 0; margin-top: 1px; }
  .meta-chip-body {}
  .meta-chip-label {
    font-size: 9.5px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 2px;
  }
  .meta-chip-value { font-size: 12.5px; color: var(--text-soft); line-height: 1.3; }
  .meta-chip-value--accent { color: var(--accent2); font-family: var(--font-display); font-size: 14px; }
`;

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="5.5"/><path d="M7 4v3.5l2 1.5" strokeLinecap="round"/>
  </svg>
);
const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M6 1c-2 0-3.5 1.5-3.5 3.5 0 2.8 3.5 6.5 3.5 6.5S9.5 7.3 9.5 4.5C9.5 2.5 8 1 6 1z"/>
  </svg>
);
const CoinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="6" cy="6" r="5"/><path d="M6 3v6M4.5 5c0-.7.7-1.2 1.5-1.2s1.5.5 1.5 1.2c0 .7-1.5 1.2-1.5 1.2S4.5 6.5 4.5 7.2C4.5 7.9 5.2 8.4 6 8.4s1.5-.5 1.5-1.2" strokeLinecap="round"/>
  </svg>
);

const HistoryList = ({ history }) => (
  <>
    <style>{styles}</style>
    <div className="history-panel">
      <div className="history-header">
        <div className="history-title-row">
          <div className="history-title-icon"><ClockIcon /></div>
          <span className="history-title">Previous Searches</span>
        </div>
        {history.length > 0 && (
          <span className="history-count">{history.length} saved</span>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <div className="history-empty-icon">
            <ClockIcon />
          </div>
          <p className="history-empty-text">Your generated proposals<br />will appear here.</p>
        </div>
      ) : (
        <div className="history-scroll">
          {history.map((item, i) => (
            <div key={item._id} className="history-item">
              <div className="history-item-header">
                <p className="history-item-query">{item.query}</p>
                <span className="history-item-idx">#{history.length - i}</span>
              </div>
              <div className="history-item-meta">
                <div className="meta-chip">
                  <span className="meta-chip-icon"><PinIcon /></span>
                  <div className="meta-chip-body">
                    <div className="meta-chip-label">Venue</div>
                    <div className="meta-chip-value">{item.proposal.venueName}</div>
                  </div>
                </div>
                <div className="meta-chip">
                  <span className="meta-chip-icon"><CoinIcon /></span>
                  <div className="meta-chip-body">
                    <div className="meta-chip-label">Cost</div>
                    <div className="meta-chip-value meta-chip-value--accent">{item.proposal.estimatedCost}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

export default HistoryList;