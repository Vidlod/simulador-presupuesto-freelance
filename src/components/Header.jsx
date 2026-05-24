export default function Header({ currency, setCurrency }) {
  return (
    <>
      <style>{`
        .head {
          position: sticky; top: 0; z-index: 50;
          background: rgba(244, 239, 227, 0.85);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border-bottom: 1px solid var(--line);
          padding: 1rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
        }
        .head-logo {
          display: flex; align-items: center; gap: 0.7rem;
          font-family: var(--display);
          font-size: 1.25rem; font-style: italic;
          color: var(--ink); letter-spacing: -0.01em;
        }
        .head-mark {
          width: 28px; height: 28px;
          border: 1.5px solid var(--ink);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: 0.7rem; font-weight: 500;
          color: var(--ink);
        }
        .head-meta {
          font-family: var(--mono); font-size: 0.65rem;
          color: var(--ink-soft); letter-spacing: 0.15em;
          text-transform: uppercase;
          display: none;
        }
        .head-currency {
          display: flex; align-items: center; gap: 0;
          border: 1px solid var(--ink);
          padding: 0;
        }
        .head-currency button {
          padding: 0.5rem 0.85rem;
          font-family: var(--mono); font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--ink);
          transition: background 0.25s, color 0.25s;
          min-height: 36px;
        }
        .head-currency button.active {
          background: var(--ink); color: var(--paper);
        }
        @media (min-width: 720px) {
          .head-meta { display: inline; }
        }
        @media (max-width: 520px) {
          .head { padding: 0.85rem 1rem; }
          .head-logo { font-size: 1.1rem; }
        }
      `}</style>
      <header className="head">
        <a href="#" className="head-logo">
          <span className="head-mark">E</span>
          Estimador<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <span className="head-meta">
          DOC · A-01 · REV 2026
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="https://portfolio-david-geo.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.65rem',
              letterSpacing: '0.15em', color: 'var(--ink-soft)',
              textTransform: 'uppercase', display: 'none',
            }}
            className="back-link">
            ← David Geo
          </a>
          <div className="head-currency" role="group" aria-label="Currency selector">
            <button
              onClick={() => setCurrency('USD')}
              className={currency === 'USD' ? 'active' : ''}>
              USD
            </button>
            <button
              onClick={() => setCurrency('COP')}
              className={currency === 'COP' ? 'active' : ''}>
              COP
            </button>
          </div>
        </div>
        <style>{`
          @media (min-width: 720px) { .back-link { display: inline !important; } }
        `}</style>
      </header>
    </>
  )
}
