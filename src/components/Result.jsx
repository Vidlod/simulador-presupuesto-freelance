import { useState } from 'react'
import { HOURLY_RATE_USD, USD_TO_COP, formatMoney, PROJECT_TYPES, FEATURES, TIMELINES, DESIGNS } from '../data/pricing'

export default function Result({ state, result, currency }) {
  const [copied, setCopied] = useState(false)
  const has = result && result.totalHours > 0

  if (!has) return (
    <section id="resultado" style={{
      maxWidth: '88rem', margin: '0 auto',
      padding: '4rem 2rem',
      borderTop: '1px solid var(--line)',
    }}>
      <div style={{
        border: '1px solid var(--line)', background: 'var(--surface)',
        padding: '3rem 2rem', textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--fg-3)', letterSpacing: '0.1em' }}>
          COMPLETA LOS PARÁMETROS PARA GENERAR LA COTIZACIÓN DETALLADA
        </p>
      </div>
    </section>
  )

  const mid  = currency === 'COP' ? result.totalCOP : result.totalUSD
  const min  = currency === 'COP' ? result.minCOP   : result.minUSD
  const max  = currency === 'COP' ? result.maxCOP   : result.maxUSD
  const rate = currency === 'COP' ? HOURLY_RATE_USD * USD_TO_COP : HOURLY_RATE_USD

  const selFeatures = FEATURES.filter(f => state.features.includes(f.id))
  const tl   = TIMELINES.find(t => t.id === state.timeline)
  const des  = DESIGNS.find(d => d.id === state.design)
  const pt   = PROJECT_TYPES.find(p => p.id === state.type)

  const today   = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: '2-digit' })
  const quoteId = `EST-${String(mid).slice(0,4)}-${state.pages}`

  const handleCopy = () => {
    const feats = selFeatures.map(f => `  • ${f.label} (+${f.hours}h)`).join('\n')
    const txt = [
      '══════════════════════════════════════',
      '  PROPUESTA DE PRESUPUESTO PRELIMINAR',
      '══════════════════════════════════════',
      `  ID Cotización : ${quoteId}`,
      `  Fecha         : ${today}`,
      '──────────────────────────────────────',
      `  Tipo           : ${pt.title} (${result.baseHours}h base)`,
      `  Páginas/Vistas : ${state.pages} (${result.pagesHours}h extra)`,
      selFeatures.length ? `  Módulos        :\n${feats}` : '  Módulos        : Ninguno',
      `  Diseño         : ${des.label} (×${result.designMult})`,
      `  Plazo          : ${tl.label} (×${result.timelineMult})`,
      '──────────────────────────────────────',
      `  HORAS TOTALES  : ${result.totalHours} h`,
      `  PLAZO          : ${result.weeks} sem (${tl.sub})`,
      `  TARIFA/HORA    : ${formatMoney(rate, currency)}`,
      '',
      `  ESTIMADO (${currency}) : ${formatMoney(mid, currency)}`,
      `  RANGO ±15%     : ${formatMoney(min, currency)} → ${formatMoney(max, currency)}`,
      '══════════════════════════════════════',
    ].join('\n')
    navigator.clipboard.writeText(txt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const mailto = () => {
    const feats = selFeatures.map(f => f.label).join(', ')
    const sub  = `Cotización — ${pt.title} (${formatMoney(mid, currency)})`
    const body = `Hola David,\n\nUsé tu simulador y me interesa conversar:\n\nTipo: ${pt.title}\nPáginas: ${state.pages}\nMódulos: ${feats || 'Ninguno'}\nPlazo: ${tl.label} (${tl.sub})\nDiseño: ${des.label}\n\nEstimado: ${formatMoney(mid, currency)}\nRango: ${formatMoney(min, currency)} → ${formatMoney(max, currency)}\n\n---\nhttps://simulador-presupuesto-freelance.vercel.app`
    return `mailto:david25geo@gmail.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <style>{`
        .res {
          max-width: 88rem; margin: 0 auto;
          padding: 4rem 2rem 6rem;
          border-top: 1px solid var(--line);
        }
        .res-doc {
          border: 1px solid var(--fg);
          background: var(--surface);
        }
        .res-dhead {
          padding: 1.5rem 2rem;
          border-bottom: 2px solid var(--fg);
          display: flex; justify-content: space-between;
          align-items: flex-start; flex-wrap: wrap; gap: 1rem;
        }
        .res-body {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 0;
        }
        .res-left { padding: 2rem; border-right: 1px solid var(--line); }
        .res-right { padding: 2rem; }
        .res-sec-lbl {
          font-size: 0.58rem; font-weight: 700;
          color: var(--fg-3); letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 1.25rem;
        }
        .res-line {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.65rem 0; border-bottom: 1px dashed var(--line-2);
          font-size: 0.8rem;
        }
        .res-line:last-child { border-bottom: none; }
        .res-line-l { color: var(--fg-2); }
        .res-line-r { font-weight: 700; font-size: 0.72rem; letter-spacing: 0.04em; }
        .res-sub-lbl {
          padding: 0.65rem 0; border-bottom: none;
          font-size: 0.58rem; font-weight: 700;
          color: var(--fg-3); letter-spacing: 0.18em; text-transform: uppercase;
          padding-top: 1.5rem;
        }
        .res-indent {
          padding-left: 1.25rem;
          font-size: 0.75rem;
        }
        .res-total {
          margin-top: 2rem; padding-top: 1.25rem;
          border-top: 2px solid var(--fg);
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .res-total-row {
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .res-price {
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 700; color: var(--accent);
          letter-spacing: -0.04em; line-height: 1;
          font-variant-numeric: tabular-nums;
          margin: 0.75rem 0 0.5rem;
        }
        .res-range {
          font-size: 0.72rem; color: var(--fg-3); line-height: 1.5;
          padding: 0.75rem; border: 1px solid var(--line-2);
          background: var(--bg);
        }
        .res-weeks {
          padding: 1.25rem; border: 1px solid var(--fg);
          margin-top: 1.25rem;
        }
        .res-btn-p {
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 0.95rem 1.25rem;
          background: var(--fg); color: var(--bg);
          font-family: var(--mono); font-size: 0.72rem;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          transition: background 0.15s; margin-top: 1.25rem;
          border: 1px solid var(--fg);
        }
        .res-btn-p:hover { background: var(--accent); border-color: var(--accent); }
        .res-btn-s {
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 0.95rem 1.25rem;
          background: transparent; color: var(--fg);
          font-family: var(--mono); font-size: 0.72rem;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          transition: background 0.15s; margin-top: 1px;
          border: 1px solid var(--line);
        }
        .res-btn-s:hover { background: var(--line-2); }
        .res-foot {
          padding: 1.25rem 2rem;
          border-top: 1px solid var(--fg);
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;
          font-size: 0.6rem; color: var(--fg-3); letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        @media (max-width: 860px) {
          .res-body { grid-template-columns: 1fr; }
          .res-left { border-right: none; border-bottom: 1px solid var(--line); }
        }
        @media (max-width: 640px) {
          .res { padding: 3rem 1.25rem; }
          .res-dhead { padding: 1.25rem; }
          .res-left, .res-right { padding: 1.5rem; }
        }
      `}</style>

      <section id="resultado" className="res">
        <div className="res-doc">

          {/* Document header */}
          <div className="res-dhead">
            <div>
              <p style={{ fontSize: '0.6rem', color: 'var(--fg-3)', letterSpacing: '0.18em', marginBottom: '0.4rem' }}>
                HOJA DE PRESUPUESTO // ID: {quoteId}
              </p>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.025em' }}>
                Cotización Detallada
              </h2>
            </div>
            <div>
              <span style={{ fontSize: '0.6rem', color: 'var(--fg-3)', letterSpacing: '0.15em', display: 'block', marginBottom: '0.2rem' }}>
                FECHA DE EMISIÓN
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 500, textTransform: 'capitalize' }}>
                {today}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="res-body">
            {/* Left — breakdown */}
            <div className="res-left">
              <p className="res-sec-lbl">CONCEPTOS Y DESGLOSE DE HORAS</p>

              <div className="res-line">
                <span className="res-line-l">Estructura base ({pt.title})</span>
                <span className="res-line-r">{result.baseHours} H</span>
              </div>

              {result.pagesHours > 0 && (
                <div className="res-line">
                  <span className="res-line-l">Páginas adicionales ({state.pages} total)</span>
                  <span className="res-line-r">+{result.pagesHours} H</span>
                </div>
              )}

              {selFeatures.length > 0 && (
                <>
                  <div className="res-line res-sub-lbl">
                    <span>MÓDULOS DEL SISTEMA</span>
                    <span className="res-line-r" style={{ color: 'var(--fg)' }}>+{result.featureHours} H</span>
                  </div>
                  {selFeatures.map(f => (
                    <div key={f.id} className="res-line res-indent">
                      <span className="res-line-l">· {f.label}</span>
                      <span className="res-line-r" style={{ color: 'var(--fg-3)' }}>+{f.hours} H</span>
                    </div>
                  ))}
                </>
              )}

              <div className="res-line" style={{ marginTop: '1rem' }}>
                <span className="res-line-l">Multiplicador de plazo ({tl.label})</span>
                <span className="res-line-r">× {result.timelineMult.toFixed(2)}</span>
              </div>
              <div className="res-line">
                <span className="res-line-l">Ajuste visual ({des.label})</span>
                <span className="res-line-r">× {result.designMult.toFixed(2)}</span>
              </div>

              <div className="res-total">
                <div className="res-total-row">
                  <span style={{ fontSize: '0.78rem', color: 'var(--fg-2)' }}>Horas totales estimadas</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>{result.totalHours} H</span>
                </div>
                <div className="res-total-row">
                  <span style={{ fontSize: '0.78rem', color: 'var(--fg-2)' }}>Tarifa ({currency})</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{formatMoney(rate, currency)}/H</span>
                </div>
              </div>
            </div>

            {/* Right — price + actions */}
            <div className="res-right">
              <p style={{ fontSize: '0.6rem', color: 'var(--fg-3)', letterSpacing: '0.18em', marginBottom: '0.3rem' }}>
                ESTIMADO PRELIMINAR ({currency})
              </p>
              <p style={{ fontSize: '0.6rem', color: 'var(--fg-3)', letterSpacing: '0.1em' }}>
                VALOR DE LA PROPUESTA
              </p>

              <div key={mid} className="res-price">{formatMoney(mid, currency)}</div>

              <div className="res-range">
                <span style={{ color: 'var(--fg-3)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  RANGO ±15%
                </span>
                <br />
                <strong>{formatMoney(min, currency)}</strong>
                {' → '}
                <strong>{formatMoney(max, currency)}</strong>
              </div>

              <div className="res-weeks">
                <p style={{ fontSize: '0.6rem', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>
                  TIEMPO ESTIMADO
                </p>
                <p style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.025em' }}>
                  {result.weeks} {result.weeks === 1 ? 'semana' : 'semanas'}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--fg-2)', marginTop: '0.2rem' }}>
                  {tl.sub} · {tl.label}
                </p>
              </div>

              <a href={mailto()} className="res-btn-p">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Enviar cotización por email
              </a>

              <button onClick={handleCopy} className="res-btn-s">
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copiar resumen de cotización
                  </>
                )}
              </button>

              <p style={{ marginTop: '1.25rem', fontSize: '0.65rem', color: 'var(--fg-3)', lineHeight: 1.5 }}>
                * Propuesta informativa. Se puede usar como base para el contrato formal.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="res-foot">
            <span>PREPARADO POR DAVID GEO</span>
            <span>BOGOTÁ · COLOMBIA</span>
            <span>{quoteId}</span>
          </div>
        </div>
      </section>
    </>
  )
}
