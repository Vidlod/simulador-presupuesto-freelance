export default function Header({ currency, setCurrency }) {
  return (
    <>
      <style>{`
        .hdr {
          position: sticky; top: 0; z-index: 50;
          background: var(--bg);
          border-bottom: 1px solid var(--fg);
          padding: 0.9rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
        }
        .hdr-logo {
          display: flex; align-items: center; gap: 0.55rem;
          font-size: 0.82rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .hdr-mark {
          width: 26px; height: 26px;
          border: 1px solid var(--fg);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0;
          flex-shrink: 0;
        }
        .hdr-meta {
          font-size: 0.6rem; color: var(--fg-3);
          letter-spacing: 0.2em; text-transform: uppercase;
          display: none;
        }
        .hdr-back {
          font-size: 0.6rem; color: var(--fg-3);
          letter-spacing: 0.12em; text-transform: uppercase;
          display: none;
          transition: color 0.15s;
        }
        .hdr-back:hover { color: var(--fg); }
        .hdr-cur {
          display: flex;
          border: 1px solid var(--fg);
        }
        .hdr-cur button {
          padding: 0.4rem 0.9rem;
          font-family: var(--mono); font-size: 0.68rem;
          font-weight: 500; letter-spacing: 0.1em;
          color: var(--fg);
          transition: background 0.12s, color 0.12s;
          min-height: 32px;
        }
        .hdr-cur button.on { background: var(--fg); color: var(--bg); }
        @media (min-width: 720px) {
          .hdr-meta { display: inline; }
          .hdr-back { display: inline; }
        }
        @media (max-width: 520px) {
          .hdr { padding: 0.75rem 1.25rem; }
        }
      `}</style>

      <header className="hdr">
        <a href="#" className="hdr-logo">
          <span className="hdr-mark">E</span>
          Estimador<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <span className="hdr-meta">DOC · A-01 · REV 2026</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a
            href="https://portfolio-david-geo.vercel.app"
            target="_blank" rel="noopener noreferrer"
            className="hdr-back">
            ← DAVID GEO
          </a>
          <div className="hdr-cur" role="group" aria-label="Moneda">
            {['USD', 'COP'].map(c => (
              <button key={c} className={currency === c ? 'on' : ''}
                onClick={() => setCurrency(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}
