import { HOURLY_RATE_USD, formatMoney } from '../data/pricing'

export default function Summary({ result, currency, setCurrency }) {
  const has = result && result.totalHours > 0
  const mid = currency === 'COP' ? result?.totalCOP : result?.totalUSD
  const min = currency === 'COP' ? result?.minCOP   : result?.minUSD
  const max = currency === 'COP' ? result?.maxCOP   : result?.maxUSD
  const rate = currency === 'COP' ? HOURLY_RATE_USD * 4000 : HOURLY_RATE_USD

  return (
    <>
      <style>{`
        .sum {
          position: sticky; top: 5rem;
          border: 1px solid var(--fg);
          background: var(--surface);
          display: flex; flex-direction: column;
        }
        .sum-head {
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid var(--fg);
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.6rem; letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .sum-live { animation: blink 1.2s step-start infinite; }
        .sum-body { padding: 1.5rem 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .sum-lbl { font-size: 0.6rem; color: var(--fg-3); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 0.45rem; }
        .sum-price {
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 700; letter-spacing: -0.03em; line-height: 1;
          color: var(--accent);
          font-variant-numeric: tabular-nums;
          animation: priceFlash 0.4s ease;
        }
        .sum-range { font-size: 0.68rem; color: var(--fg-3); margin-top: 0.4rem; letter-spacing: 0.02em; }
        .sum-divider { border: none; border-top: 1px dashed var(--line); margin: 0; }
        .sum-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.5rem 0;
          border-bottom: 1px dashed var(--line-2);
          font-size: 0.75rem;
        }
        .sum-row:last-child { border-bottom: none; }
        .sum-row span { color: var(--fg-2); }
        .sum-row b { font-weight: 700; font-size: 0.7rem; letter-spacing: 0.04em; }
        .sum-empty {
          font-size: 0.8rem; color: var(--fg-3); line-height: 1.6;
          text-align: center; padding: 1.5rem 0;
        }
        .sum-cta {
          display: flex; align-items: center; justify-content: center; gap: 0.65rem;
          padding: 1rem 1.25rem;
          background: var(--fg); color: var(--bg);
          font-family: var(--mono); font-size: 0.72rem;
          font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          transition: background 0.15s;
          border-top: 1px solid var(--fg);
        }
        .sum-cta:hover { background: var(--accent); }
        .sum-note {
          padding: 1rem 1.25rem;
          font-size: 0.65rem; color: var(--fg-3); line-height: 1.5;
          border-top: 1px dashed var(--line);
        }
      `}</style>

      <aside className="sum">
        <div className="sum-head">
          <span>ESTIMADO EN VIVO</span>
          <span className="sum-live">●</span>
        </div>

        <div className="sum-body">
          <div>
            <p className="sum-lbl">COSTO ESTIMADO ({currency})</p>
            {has ? (
              <>
                <div key={mid} className="sum-price">{formatMoney(mid, currency)}</div>
                <p className="sum-range">
                  RANGO ±15%: {formatMoney(min, currency)} → {formatMoney(max, currency)}
                </p>
              </>
            ) : (
              <p className="sum-empty">
                Configura los pasos<br/>para ver el estimado.
              </p>
            )}
          </div>

          {has && (
            <>
              <hr className="sum-divider" />
              <div>
                <p className="sum-lbl">DESGLOSE</p>
                <div className="sum-row">
                  <span>Horas estimadas</span>
                  <b>{result.totalHours} H</b>
                </div>
                <div className="sum-row">
                  <span>Tarifa / hora</span>
                  <b>{formatMoney(rate, currency)}</b>
                </div>
                <div className="sum-row">
                  <span>Plazo estimado</span>
                  <b>{result.weeks} SEM</b>
                </div>
                <div className="sum-row">
                  <span>Tipo</span>
                  <b style={{ fontSize: '0.65rem' }}>{result.projectType}</b>
                </div>
              </div>
            </>
          )}
        </div>

        {has && (
          <a href="#resultado" className="sum-cta">
            Ver cotización completa
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}

        <p className="sum-note">
          * Estimación orientativa. La cotización final requiere una conversación sobre el alcance específico.
        </p>
      </aside>
    </>
  )
}
