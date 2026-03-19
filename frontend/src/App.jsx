import { useEffect, useState } from "react";
import EventForm from "./components/EventForm";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";
import { createSearch, getSearchHistory } from "./api/searchApi";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d0d0f; --surface: #141417; --surface2: #1c1c21;
    --border: rgba(255,255,255,0.07); --border-hover: rgba(201,147,58,0.35);
    --accent: #c9933a; --accent2: #e8b96a; --accent-dim: rgba(201,147,58,0.1);
    --text: #f0ede8; --text-soft: #c8c4bc; --muted: #6a6870;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
    --radius: 14px; --radius-lg: 22px;
    --shadow-card: 0 2px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset;
    --transition: 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  html, body { background: var(--bg); color: var(--text); font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
  .app-root { min-height: 100vh; display: flex; flex-direction: column; }
  .app-header {
    position: relative; overflow: hidden;
    padding: 60px 56px 52px; border-bottom: 1px solid var(--border);
    background: linear-gradient(150deg, #111115 0%, #17141e 100%);
  }
  .header-inner { position: relative; z-index: 1; max-width: 560px; }
  .header-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10.5px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); border: 1px solid rgba(201,147,58,0.3); padding: 5px 14px;
    border-radius: 100px; margin-bottom: 24px; background: rgba(201,147,58,0.06);
  }
  .header-eyebrow::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: var(--accent); display: inline-block; animation: blink 2s infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }
  .header-title {
    font-family: var(--font-display); font-size: clamp(40px,5.5vw,68px); font-weight: 700;
    line-height: 1.0; color: var(--text); margin-bottom: 18px; letter-spacing: -0.01em;
  }
  .header-subtitle { font-size: 14.5px; font-weight: 300; color: var(--muted); line-height: 1.7; max-width: 380px; }
  .header-decoration { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .deco-circle { position: absolute; border-radius: 50%; border: 1px solid rgba(201,147,58,0.1); }
  .deco-circle--1 { width: 380px; height: 380px; top: -140px; right: -80px; }
  .deco-circle--2 { width: 220px; height: 220px; top: -40px; right: 120px; border-color: rgba(201,147,58,0.06); }
  .deco-line {
    position: absolute; bottom: 0; right: 280px; width: 1px; height: 100%;
    background: linear-gradient(to bottom, transparent 0%, rgba(201,147,58,0.12) 50%, transparent 100%);
  }
  .app-main {
    display: grid; grid-template-columns: 1fr 1fr; gap: 28px;
    padding: 40px 56px; flex: 1; max-width: 1320px; margin: 0 auto; width: 100%;
  }
  .main-left { display: flex; flex-direction: column; gap: 22px; }
  .main-right { display: flex; flex-direction: column; }
  @media (max-width: 960px) {
    .app-header { padding: 36px 24px 32px; }
    .app-main { grid-template-columns: 1fr; padding: 24px; }
  }
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await getSearchHistory();
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to load history", error);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleGenerate = async (query) => {
    try {
      setLoading(true);
      const res = await createSearch(query);
      setCurrentResult(res.data.proposal);
      fetchHistory();
    } catch (error) {
      console.error("Generate failed", error);
     alert("Gemini API error: Free tier quota exhausted. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <style>{globalStyles}</style>
      <header className="app-header">
        <div className="header-inner">
          <span className="header-eyebrow">Corporate Retreat Planner</span>
          <h1 className="header-title">Plan Your Perfect<br />Offsite</h1>
          <p className="header-subtitle">
            Describe your team, budget, and vision — get a tailored venue proposal instantly.
          </p>
        </div>
        <div className="header-decoration" aria-hidden="true">
          <span className="deco-circle deco-circle--1" />
          <span className="deco-circle deco-circle--2" />
          <span className="deco-line" />
        </div>
      </header>
      <main className="app-main">
        <div className="main-left">
          <EventForm onSubmit={handleGenerate} loading={loading} />
          <ResultCard proposal={currentResult} />
        </div>
        <div className="main-right">
          <HistoryList history={history} />
        </div>
      </main>
    </div>
  );
}

export default App;