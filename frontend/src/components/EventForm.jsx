import { useState } from "react";

const styles = `
  .form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 32px;
    box-shadow: var(--shadow-card);
    transition: border-color var(--transition);
  }
  .form-card:focus-within { border-color: var(--border-hover); }
  .form-label-row {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;
  }
  .form-title {
    font-family: var(--font-display); font-size: 26px; font-weight: 700;
    color: var(--text); letter-spacing: -0.01em;
  }
  .form-badge {
    font-size: 10px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent); background: var(--accent-dim); border: 1px solid rgba(201,147,58,0.2);
    padding: 3px 10px; border-radius: 100px;
  }
  .form-hint {
    font-size: 13px; color: var(--muted); margin-bottom: 16px; line-height: 1.5;
  }
  .form-textarea-wrapper { position: relative; margin-bottom: 20px; }
  .form-textarea {
    width: 100%; background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px 18px; color: var(--text);
    font-family: var(--font-body); font-size: 14.5px; font-weight: 300; line-height: 1.65;
    resize: none; outline: none; transition: border-color var(--transition), box-shadow var(--transition);
    min-height: 140px;
  }
  .form-textarea::placeholder { color: var(--muted); font-style: italic; }
  .form-textarea:focus {
    border-color: var(--accent); box-shadow: 0 0 0 3px rgba(201,147,58,0.12);
  }
  .form-char-count {
    position: absolute; bottom: 12px; right: 14px;
    font-size: 11px; color: var(--muted); pointer-events: none;
  }
  .form-footer { display: flex; align-items: center; gap: 16px; }
  .form-submit {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--accent); color: #0d0d0f;
    font-family: var(--font-body); font-size: 13.5px; font-weight: 500;
    letter-spacing: 0.04em; padding: 12px 28px;
    border: none; border-radius: 100px; cursor: pointer;
    transition: background var(--transition), transform var(--transition), opacity var(--transition);
  }
  .form-submit:hover:not(:disabled) { background: var(--accent2); transform: translateY(-1px); }
  .form-submit:active:not(:disabled) { transform: translateY(0); }
  .form-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .submit-icon { width: 16px; height: 16px; }
  .spinner {
    width: 14px; height: 14px; border: 2px solid rgba(13,13,15,0.3);
    border-top-color: #0d0d0f; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .form-tip { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .form-tip strong { color: var(--text-soft); font-weight: 400; }
`;

const EventForm = ({ onSubmit, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query);
    setQuery("");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="form-card">
        <div className="form-label-row">
          <h2 className="form-title">Describe Your Retreat</h2>
          <span className="form-badge">AI-Powered</span>
        </div>
        <p className="form-hint">
          Include team size, duration, location preference, and budget for best results.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-textarea-wrapper">
            <textarea
              className="form-textarea"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows="5"
              placeholder={`e.g. "A 10-person leadership retreat in the mountains for 3 days with a $4k budget."`}
              disabled={loading}
            />
            <span className="form-char-count">{query.length}</span>
          </div>
          <div className="form-footer">
            <button type="submit" className="form-submit" disabled={loading || !query.trim()}>
              {loading ? (
                <>
                  <span className="spinner" />
                  Generating...
                </>
              ) : (
                <>
                  <svg className="submit-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Generate Proposal
                </>
              )}
            </button>
            <p className="form-tip">
              <strong>Tip:</strong> Be specific about your goals
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default EventForm;