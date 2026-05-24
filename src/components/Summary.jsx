import { HOURLY_RATE_USD, formatMoney } from '../data/pricing'

export default function Summary({ result, currency }) {
  const hasResult = result && result.totalHours > 0

  // Currency-specific values
  const minAmount  = currency === 'COP' ? result?.minCOP  : result?.minUSD
  const maxAmount  = currency === 'COP' ? result?.maxCOP  : result?.maxUSD
  const midAmount  = currency === 'COP' ? result?.totalCOP : result?.totalUSD
  const rateAmount = currency === 'COP' ? HOURLY_RATE_USD * 4000 : HOURLY_RATE_USD

  return (
    <>
      <style>{`
        .summary {
          position: sticky; top: 6rem;
          background: var(--paper-warm);
          border: 1px solid var(--ink);
          padding: 2rem 1.75rem;
          display: flex; flex-direction: column; gap: 1.5rem;
        }
        .summary::before, .summary::after {
          content: '';
          position: absolute; width: 10px; height: 10px;
        }
        .summary::before {
          top: -1px; left: -1px;
          border-top: 2px solid var(--accent);
          border-left: 2px solid var(--accent);
        }
        .summary::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid var(--accent);
          border-right: 2px solid var(--accent);
        }
        .sum-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.55rem 0;
          border-bottom: 1px dashed var(--line);
          font-size: 0.82rem; color: var(--ink-soft);
        }
        .sum-row:last-of-type { border-bottom: none; }
        .sum-row b {
          font-weight: 500; color: var(--ink);
          font-family: var(--mono); font-size: 0.78rem;
        }
        .sum-empty {
          padding: 2rem 0; text-align: center;
          color: var(--ink-faint);
          font-family: var(--display); font-style: italic;
          font-size: 1.15rem; line-height: 1.4;
        }
        .sum-empty::before {
          content: '↓'; display: block;
          font-size: 1.5rem; margin-bottom: 0.5rem;
          opacity: 0.5;
        }
        .sum-big {
          font-family: var(--display);
          font-size: clamp(2.2rem, 3.4vw, 2.8rem);
          color: var(--accent);
          line-height: 1; font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
          animation: priceFlash 0.5s ease;
        }
        .sum-range {
          font-family: var(--mono); font-size: 0.75rem;
          color: var(--ink-soft); letter-spacing: 0.05em;
        }
      `}</style>

      <aside className="summary">
        {/* Doc-style header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: '0.62rem',
          color: 'var(--ink-soft)', letterSpacing: '0.18em',
        }}>
          <span>ESTIMATE · LIVE</span>
          <span style={{ animation: 'blink 1.4s infinite' }}>●</span>
        </div>

        <div>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem',
            color: 'var(--ink-faint)', letterSpacing: '0.15em',
            marginBottom: '0.5rem',
          }}>
            COSTO ESTIMADO ({currency})
          </p>

          {hasResult ? (
            <>
              <div key={midAmount} className="sum-big">
                {formatMoney(midAmount, currency)}
              </div>
              <p className="sum-range" style={{ marginTop: '0.65rem' }}>
                Rango: {formatMoney(minAmount, currency)} → {formatMoney(maxAmount, currency)}
              </p>
            </>
          ) : (
            <div className="sum-empty">
              completa los pasos<br/>para ver el estimado
            </div>
          )}
        </div>

        {hasResult && (
          <>
            <hr className="dashed-line" />

            <div>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: '0.62rem',
                color: 'var(--ink-faint)', letterSpacing: '0.15em',
                marginBottom: '0.85rem',
              }}>
                DESGLOSE
              </p>
              <div className="sum-row">
                <span>Horas estimadas</span>
                <b>{result.totalHours} h</b>
              </div>
              <div className="sum-row">
                <span>Tarifa por hora</span>
                <b>{formatMoney(rateAmount, currency)}</b>
              </div>
              <div className="sum-row">
                <span>Plazo estimado</span>
                <b>{result.weeks} sem</b>
              </div>
              <div className="sum-row">
                <span>Tipo de proyecto</span>
                <b style={{ fontSize: '0.72rem' }}>{result.projectType}</b>
              </div>
            </div>

            <hr className="dashed-line" />

            <a href="#resultado"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.65rem',
                padding: '1rem 1.25rem',
                background: 'var(--accent)',
                color: 'var(--paper)',
                fontFamily: 'var(--mono)', fontSize: '0.75rem',
                letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(200,74,48,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              Ver detalle completo
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </>
        )}

        <p style={{
          fontSize: '0.7rem', color: 'var(--ink-faint)',
          fontStyle: 'italic', lineHeight: 1.5,
          marginTop: 'auto', paddingTop: '0.5rem',
          borderTop: '1px dashed var(--line)',
        }}>
          * Estimación orientativa. La cotización final requiere
          una conversación sobre el alcance específico.
        </p>
      </aside>
    </>
  )
}
