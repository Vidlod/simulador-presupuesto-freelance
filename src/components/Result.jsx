import { HOURLY_RATE_USD, USD_TO_COP, formatMoney, PROJECT_TYPES, FEATURES, TIMELINES, DESIGNS } from '../data/pricing'

export default function Result({ state, result, currency }) {
  const hasResult = result && result.totalHours > 0

  if (!hasResult) return (
    <section id="resultado" style={{
      padding: '6rem 2rem', maxWidth: '88rem', margin: '0 auto',
      textAlign: 'center',
      borderTop: '1px dashed var(--line)',
    }}>
      <p className="display italic" style={{
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
        color: 'var(--ink-faint)', marginBottom: '1rem',
      }}>
        Esperando datos…
      </p>
      <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
        Completa al menos el tipo de proyecto, plazo y nivel de diseño para ver el resultado completo.
      </p>
    </section>
  )

  const midAmount = currency === 'COP' ? result.totalCOP : result.totalUSD
  const minAmount = currency === 'COP' ? result.minCOP : result.minUSD
  const maxAmount = currency === 'COP' ? result.maxCOP : result.maxUSD
  const rate      = currency === 'COP' ? HOURLY_RATE_USD * USD_TO_COP : HOURLY_RATE_USD

  const selectedFeatures = FEATURES.filter(f => state.features.includes(f.id))
  const timeline = TIMELINES.find(t => t.id === state.timeline)
  const design = DESIGNS.find(d => d.id === state.design)
  const projectType = PROJECT_TYPES.find(p => p.id === state.type)

  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: '2-digit',
  })

  return (
    <>
      <style>{`
        .result-wrap {
          padding: 6rem 2rem;
          max-width: 88rem;
          margin: 0 auto;
          border-top: 1px dashed var(--line);
        }
        .result-doc {
          background: var(--paper-warm);
          border: 1px solid var(--ink);
          padding: clamp(2rem, 5vw, 4rem);
          position: relative;
        }
        .result-doc-corner {
          position: absolute; width: 18px; height: 18px;
          border-color: var(--accent);
        }
        .result-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 4rem;
          margin-top: 3rem;
        }
        .line-item {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.85rem 0;
          border-bottom: 1px dashed var(--line);
          font-size: 0.92rem;
        }
        .line-item-label { color: var(--ink-soft); }
        .line-item-val { font-family: var(--mono); color: var(--ink); font-size: 0.85rem; }
        .stamp {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1.5px solid var(--accent);
          color: var(--accent);
          font-family: var(--mono); font-size: 0.7rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          transform: rotate(-2deg);
        }
        @media (max-width: 860px) {
          .result-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 640px) {
          .result-wrap { padding: 3rem 1rem; }
        }
      `}</style>

      <section id="resultado" className="result-wrap">
        <div className="result-doc">
          {/* Corners */}
          <span className="result-doc-corner" style={{ top: '-1px', left: '-1px', borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' }} />
          <span className="result-doc-corner" style={{ top: '-1px', right: '-1px', borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' }} />
          <span className="result-doc-corner" style={{ bottom: '-1px', left: '-1px', borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' }} />
          <span className="result-doc-corner" style={{ bottom: '-1px', right: '-1px', borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' }} />

          {/* Doc header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            flexWrap: 'wrap', gap: '1.5rem',
            paddingBottom: '2rem', borderBottom: '1px solid var(--ink)',
          }}>
            <div>
              <p className="mono" style={{ color: 'var(--ink-soft)', marginBottom: '0.75rem' }}>
                SHEET 02 / 02 · TOTAL ESTIMATE
              </p>
              <h2 className="display" style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                color: 'var(--ink)',
              }}>
                Hoja de <em className="italic" style={{ color: 'var(--accent)' }}>presupuesto</em>
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="mono" style={{ color: 'var(--ink-soft)' }}>FECHA</p>
              <p style={{
                fontFamily: 'var(--display)', fontStyle: 'italic',
                fontSize: '1.1rem', color: 'var(--ink)',
                marginTop: '0.3rem', textTransform: 'capitalize',
              }}>{today}</p>
            </div>
          </div>

          {/* Body grid */}
          <div className="result-grid">
            {/* Left — Itemized breakdown */}
            <div>
              <p className="mono" style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                ── DESGLOSE
              </p>

              <div className="line-item">
                <span className="line-item-label">Tipo · {projectType.title}</span>
                <span className="line-item-val">{result.baseHours} h</span>
              </div>
              {result.pagesHours > 0 && (
                <div className="line-item">
                  <span className="line-item-label">Páginas adicionales · {state.pages}</span>
                  <span className="line-item-val">+{result.pagesHours} h</span>
                </div>
              )}

              {selectedFeatures.length > 0 && (
                <>
                  <div className="line-item" style={{ paddingTop: '1.25rem' }}>
                    <span className="mono" style={{ color: 'var(--ink-soft)' }}>FUNCIONALIDADES</span>
                    <span className="line-item-val">+{result.featureHours} h</span>
                  </div>
                  {selectedFeatures.map(f => (
                    <div key={f.id} className="line-item" style={{ paddingLeft: '1rem', fontSize: '0.82rem' }}>
                      <span className="line-item-label" style={{ color: 'var(--ink-faint)' }}>· {f.label}</span>
                      <span className="line-item-val" style={{ color: 'var(--ink-faint)' }}>+{f.hours} h</span>
                    </div>
                  ))}
                </>
              )}

              <div className="line-item" style={{ paddingTop: '1.5rem' }}>
                <span className="line-item-label">Multiplicador plazo · {timeline.label}</span>
                <span className="line-item-val">× {result.timelineMult.toFixed(2)}</span>
              </div>
              <div className="line-item">
                <span className="line-item-label">Multiplicador diseño · {design.label}</span>
                <span className="line-item-val">× {result.designMult.toFixed(2)}</span>
              </div>

              {/* Totals */}
              <div style={{
                marginTop: '2rem', padding: '1.5rem 0',
                borderTop: '2px solid var(--ink)',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>Total horas</span>
                  <span className="display" style={{ fontSize: '1.5rem' }}>{result.totalHours} h</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                }}>
                  <span style={{ color: 'var(--ink-soft)', fontSize: '0.85rem' }}>Tarifa hora ({currency})</span>
                  <span className="mono" style={{ fontSize: '0.85rem' }}>{formatMoney(rate, currency)}</span>
                </div>
              </div>
            </div>

            {/* Right — Big total */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span className="stamp">PRESUPUESTO · {currency}</span>

              <div>
                <p className="mono" style={{ color: 'var(--ink-soft)', marginBottom: '0.65rem' }}>
                  COSTO TOTAL ESTIMADO
                </p>
                <p className="display" style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  color: 'var(--accent)', lineHeight: 1,
                  letterSpacing: '-0.03em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {formatMoney(midAmount, currency)}
                </p>
                <p style={{
                  fontFamily: 'var(--mono)', fontSize: '0.78rem',
                  color: 'var(--ink-soft)', marginTop: '0.85rem',
                  letterSpacing: '0.06em',
                }}>
                  Rango ±15%:<br/>
                  <span style={{ color: 'var(--ink)' }}>{formatMoney(minAmount, currency)}</span>
                  <span style={{ margin: '0 0.5rem', color: 'var(--ink-faint)' }}>→</span>
                  <span style={{ color: 'var(--ink)' }}>{formatMoney(maxAmount, currency)}</span>
                </p>
              </div>

              <div style={{
                padding: '1.25rem',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
              }}>
                <p className="mono" style={{ color: 'var(--ink-soft)', marginBottom: '0.6rem' }}>
                  PLAZO
                </p>
                <p className="display italic" style={{ fontSize: '1.5rem', color: 'var(--ink)' }}>
                  {result.weeks} semanas
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: '0.4rem' }}>
                  {timeline.sub} · {timeline.label.toLowerCase()}
                </p>
              </div>

              {/* CTA */}
              <a href="https://portfolio-david-geo.vercel.app/#contacto"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  fontFamily: 'var(--display)', fontSize: '1.1rem',
                  fontStyle: 'italic',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(26,43,63,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                Solicitar cotización real
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <p style={{
                fontSize: '0.78rem', color: 'var(--ink-faint)',
                fontStyle: 'italic', lineHeight: 1.55,
                paddingTop: '0.5rem',
              }}>
                * Este estimado es orientativo. La cotización formal
                requiere una conversación sobre el alcance específico,
                contenido, integraciones y revisiones.
              </p>
            </div>
          </div>

          {/* Doc footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingTop: '2.5rem', marginTop: '3rem',
            borderTop: '1px dashed var(--line)',
            fontFamily: 'var(--mono)', fontSize: '0.62rem',
            color: 'var(--ink-faint)', letterSpacing: '0.18em',
          }}>
            <span>PREPARED BY DAVID GEO</span>
            <span>BOGOTÁ · COL</span>
            <span>EST-{Math.abs(midAmount.toString().slice(0, 4))}</span>
          </div>
        </div>
      </section>
    </>
  )
}
