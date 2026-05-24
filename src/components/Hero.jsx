export default function Hero() {
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  })

  return (
    <>
      <style>{`
        .hero {
          padding: 5rem 2rem 4rem;
          max-width: 88rem; margin: 0 auto;
          position: relative;
        }
        .hero-doc-meta {
          display: flex; justify-content: space-between;
          margin-bottom: 4rem;
          font-family: var(--mono); font-size: 0.65rem;
          color: var(--ink-soft); letter-spacing: 0.18em;
          text-transform: uppercase;
          border-top: 1px solid var(--ink);
          border-bottom: 1px solid var(--line);
          padding: 0.85rem 0;
        }
        .hero-h1 {
          font-size: clamp(2.8rem, 8vw, 7rem);
          color: var(--ink);
          margin-bottom: 2.5rem;
          max-width: 18ch;
        }
        .hero-h1 em {
          font-style: italic;
          color: var(--accent);
        }
        .hero-sub {
          font-family: var(--sans); font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: var(--ink-soft); max-width: 40rem;
          line-height: 1.6; margin-bottom: 3rem;
        }
        .hero-steps {
          display: flex; gap: 0.85rem; flex-wrap: wrap;
          font-family: var(--mono); font-size: 0.7rem;
          color: var(--ink-soft); letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hero-step {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 0.85rem;
          border: 1px solid var(--line);
          background: rgba(244,239,227,0.7);
        }
        .hero-step-n { color: var(--accent); }

        /* Corner crosshair marks (architectural) */
        .crosshair {
          position: absolute; width: 14px; height: 14px;
          pointer-events: none; opacity: 0.7;
        }
        .crosshair::before, .crosshair::after {
          content: ''; position: absolute; background: var(--ink);
        }
        .crosshair::before { left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-50%); }
        .crosshair::after  { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-50%); }

        @media (max-width: 640px) {
          .hero { padding: 3rem 1.25rem 2.5rem; }
          .hero-doc-meta { margin-bottom: 2.5rem; gap: 0.75rem; flex-wrap: wrap; }
          .hero-sub { margin-bottom: 2rem; }
        }
      `}</style>

      <section className="hero">
        <span className="crosshair" style={{ top: '2rem', left: '0.5rem' }} />
        <span className="crosshair" style={{ top: '2rem', right: '0.5rem' }} />

        <div className="hero-doc-meta">
          <span>SHEET 01 / 02</span>
          <span>BUDGET ESTIMATE</span>
          <span>{today}</span>
        </div>

        <h1 className="display hero-h1" style={{
          animation: 'fadeUp 1s 0.1s cubic-bezier(0.19,1,0.22,1) forwards', opacity: 0,
        }}>
          ¿Cuánto cuesta tu <em>próximo</em> proyecto web?
        </h1>

        <p className="hero-sub" style={{
          animation: 'fadeUp 1s 0.3s ease forwards', opacity: 0,
        }}>
          Una estimación instantánea basada en alcance, funcionalidades
          y plazo. Diseñada para que sepas en qué rango se mueve tu proyecto
          antes de pedir una cotización formal.
        </p>

        <div className="hero-steps" style={{
          animation: 'fadeUp 1s 0.5s ease forwards', opacity: 0,
        }}>
          <span className="hero-step"><span className="hero-step-n">01</span> Tipo</span>
          <span className="hero-step"><span className="hero-step-n">02</span> Tamaño</span>
          <span className="hero-step"><span className="hero-step-n">03</span> Funciones</span>
          <span className="hero-step"><span className="hero-step-n">04</span> Plazo</span>
          <span className="hero-step"><span className="hero-step-n">05</span> Diseño</span>
          <span className="hero-step" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            <span className="hero-step-n">→</span> Total
          </span>
        </div>
      </section>
    </>
  )
}
