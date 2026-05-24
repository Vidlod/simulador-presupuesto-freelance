import { useState } from 'react'
import { HOURLY_RATE_USD, USD_TO_COP, formatMoney, PROJECT_TYPES, FEATURES, TIMELINES, DESIGNS } from '../data/pricing'

export default function Result({ state, result, currency }) {
  const [copied, setCopied] = useState(false)
  const hasResult = result && result.totalHours > 0

  if (!hasResult) {
    return (
      <section id="resultado" style={{
        padding: '5rem 2.5rem', maxWidth: '88rem', margin: '0 auto',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}>
        <div className="glass-card" style={{ padding: '3rem 2rem' }}>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)', marginBottom: '0.75rem',
            fontWeight: '600'
          }}>
            Esperando especificaciones…
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '30rem', margin: '0 auto' }}>
            Completa la configuración en el panel superior (tipo de proyecto, plazo y nivel de diseño) para generar tu cotización detallada en tiempo real.
          </p>
        </div>
      </section>
    )
  }

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

  // Format code for quotation ID
  const quoteId = `EST-${Math.abs(midAmount.toString().slice(0, 4))}-${state.pages}`

  // Text formatting for clipboard copy
  const handleCopyQuote = () => {
    const featuresList = selectedFeatures.map(f => `  • ${f.label} (+${f.hours}h)`).join('\n')
    const textToCopy = `======================================
📄 PROPUESTA DE PRESUPUESTO PRELIMINAR
======================================
ID Cotización: ${quoteId}
Fecha: ${today}
--------------------------------------
1. DETALLE DE DESARROLLO
   • Estructura base: ${projectType.title} (${result.baseHours}h)
   • Pantallas/Vistas: ${state.pages} pág. (${result.pagesHours}h adicionales)
${selectedFeatures.length > 0 ? `2. MÓDULOS Y FUNCIONES\n${featuresList}` : '2. MÓDULOS Y FUNCIONES\n  • Ninguno'}

3. AJUSTES DE ENTREGA Y DISEÑO
   • Nivel de diseño: ${design.label} (Multiplicador: x${result.designMult})
   • Plazo / Prioridad: ${timeline.label} (Multiplicador: x${result.timelineMult})
--------------------------------------
TOTAL HORAS ESTIMADAS: ${result.totalHours} horas
TIEMPO ESTIMADO: ${result.weeks} semanas (${timeline.sub})
TARIFA ESTIMADA POR HORA: ${formatMoney(rate, currency)}/h

RANGO TOTAL ESTIMADO (${currency}):
💰 PROMEDIO: ${formatMoney(midAmount, currency)}
📊 RANGO (±15%): ${formatMoney(minAmount, currency)} a ${formatMoney(maxAmount, currency)}
--------------------------------------
*Estimación preliminar y orientativa generada para contacto.*
======================================`

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Pre-filled mailto link
  const getMailtoLink = () => {
    const modulesText = selectedFeatures.map(f => f.label).join(', ')
    const subject = `Cotización de proyecto web — ${projectType.title} (${formatMoney(midAmount, currency)})`
    const body = `Hola David,\n\nCoticé un proyecto con tu simulador y me interesa conversarlo:\n\n📋 DETALLE DEL PROYECTO\n- Tipo: ${projectType.title}\n- Páginas/Vistas: ${state.pages}\n- Módulos: ${modulesText || 'Ninguno'}\n- Plazo: ${timeline.label} (${timeline.sub})\n- Nivel de diseño: ${design.label}\n\n💰 ESTIMADO\n- Total estimado: ${formatMoney(midAmount, currency)}\n- Rango: ${formatMoney(minAmount, currency)} a ${formatMoney(maxAmount, currency)}\n- Horas: ${result.totalHours}h / ${result.weeks} semanas\n\n¿Tienes disponibilidad para conversar sobre el desarrollo?\n\n---\nCotización generada con: https://simulador-presupuesto-freelance.vercel.app`
    return `mailto:david25geo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <style>{`
        .result-wrap {
          padding: 4rem 2.5rem 6rem;
          max-width: 88rem;
          margin: 0 auto;
          border-top: 1px solid var(--border);
        }
        
        .result-doc {
          background: rgba(15, 21, 36, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: clamp(1.5rem, 5vw, 3.5rem);
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          overflow: hidden;
        }

        .result-doc::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
        }

        .result-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 3.5rem;
          margin-top: 2.5rem;
        }

        .line-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 0.9rem 0;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
          font-size: 0.92rem;
        }

        .line-item-label { color: var(--text-secondary); }
        .line-item-val { font-family: var(--mono); color: var(--text-primary); font-size: 0.85rem; font-weight: 600; }
        
        .stamp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          border: 1.5px solid var(--accent);
          border-radius: 6px;
          color: var(--accent);
          font-family: var(--mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(16, 185, 129, 0.05);
          width: fit-content;
        }

        .action-btn-group {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .action-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 1rem 1.5rem;
          background: #10B981;
          color: #ffffff;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
          transition: all 0.25s ease;
        }

        .action-primary:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35);
        }

        .action-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          color: var(--text-primary);
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .action-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }

        .spec-box {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 12px;
        }

        @media (max-width: 860px) {
          .result-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 640px) {
          .result-wrap { padding: 3rem 1.25rem; }
        }
      `}</style>

      <section id="resultado" className="result-wrap">
        <div className="result-doc">
          
          {/* Doc Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            flexWrap: 'wrap', gap: '1.5rem',
            paddingBottom: '2rem', borderBottom: '1px solid var(--border)',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                HOJA DE PRESUPUESTO // ID: {quoteId}
              </p>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: '800',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em'
              }}>
                Cotización Detallada
              </h2>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block' }}>FECHA DE EMISIÓN</span>
              <span style={{
                fontSize: '1rem', color: 'var(--text-secondary)',
                fontWeight: '600', textTransform: 'capitalize',
                marginTop: '0.2rem', display: 'block'
              }}>{today}</span>
            </div>
          </div>

          {/* Body Grid */}
          <div className="result-grid">
            
            {/* Left Column — Itemized Breakdown */}
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                ── CONCEPTOS Y DESGLOSE DE HORAS
              </p>

              <div className="line-item">
                <span className="line-item-label">Estructura base ({projectType.title})</span>
                <span className="line-item-val">{result.baseHours} h</span>
              </div>
              
              {result.pagesHours > 0 && (
                <div className="line-item">
                  <span className="line-item-label">Páginas/secciones adicionales ({state.pages})</span>
                  <span className="line-item-val">+{result.pagesHours} h</span>
                </div>
              )}

              {selectedFeatures.length > 0 && (
                <>
                  <div className="line-item" style={{ paddingTop: '1.25rem', borderBottom: 'none' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>MÓDULOS DE SISTEMA</span>
                    <span className="line-item-val" style={{ color: 'var(--accent)' }}>+{result.featureHours} h</span>
                  </div>
                  {selectedFeatures.map(f => (
                    <div key={f.id} className="line-item" style={{ paddingLeft: '1rem', fontSize: '0.85rem' }}>
                      <span className="line-item-label" style={{ color: 'var(--text-secondary)' }}>• {f.label}</span>
                      <span className="line-item-val" style={{ color: 'var(--text-muted)' }}>+{f.hours} h</span>
                    </div>
                  ))}
                </>
              )}

              <div className="line-item" style={{ paddingTop: '1.5rem' }}>
                <span className="line-item-label">Multiplicador por Plazo ({timeline.label})</span>
                <span className="line-item-val">× {result.timelineMult.toFixed(2)}</span>
              </div>
              <div className="line-item">
                <span className="line-item-label">Ajuste de Acabado Visual ({design.label})</span>
                <span className="line-item-val">× {result.designMult.toFixed(2)}</span>
              </div>

              {/* Totals Summary */}
              <div style={{
                marginTop: '2.5rem', padding: '1.25rem 0',
                borderTop: '2px solid var(--border)',
              }}>
                <div style={{
                  display: 'flex', justifycontent: 'space-between', alignItems: 'center',
                  marginBottom: '0.65rem', justifyContent: 'space-between'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Esfuerzo estimado total</span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>{result.totalHours} horas</span>
                </div>
                <div style={{
                  display: 'flex', justifycontent: 'space-between', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Tarifa base establecida ({currency})</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{formatMoney(rate, currency)}/h</span>
                </div>
              </div>
            </div>

            {/* Right Column — Large Pricing and CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <span className="stamp">ESTIMADO PRELIMINAR ({currency})</span>

              <div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  VALOR DE LA PROPUESTA
                </p>
                <p style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  color: 'var(--accent)', lineHeight: 1,
                  letterSpacing: '-0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {formatMoney(midAmount, currency)}
                </p>
                
                <div style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)', marginTop: '0.75rem',
                  lineHeight: 1.5,
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Rango estimado (según fluctuaciones del alcance):</span><br/>
                  <strong style={{ color: 'var(--text-primary)' }}>{formatMoney(minAmount, currency)}</strong> a <strong style={{ color: 'var(--text-primary)' }}>{formatMoney(maxAmount, currency)}</strong>
                </div>
              </div>

              {/* Delivery Speed Info */}
              <div className="spec-box">
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  TIEMPO ESTIMADO DE TRABAJO
                </p>
                <p style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {result.weeks} {result.weeks === 1 ? 'semana' : 'semanas'}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Velocidad: {timeline.sub} ({timeline.label})
                </p>
              </div>

              {/* Actions Section */}
              <div className="action-btn-group">
                <a href={getMailtoLink()} className="action-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Enviar Cotización por Correo</span>
                </a>

                <button onClick={handleCopyQuote} className="action-secondary">
                  {copied ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: '#10B981' }}>¡Copiado Exitosamente!</span>
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copiar Resumen para Portafolio</span>
                    </>
                  )}
                </button>
              </div>

              <p style={{
                fontSize: '0.72rem', color: 'var(--text-muted)',
                lineHeight: 1.5,
                fontStyle: 'italic',
                paddingTop: '0.25rem',
              }}>
                * Esta propuesta es informativa. Se puede usar como base para el contrato formal de desarrollo.
              </p>
            </div>
          </div>

          {/* Doc Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingTop: '2rem', marginTop: '2.5rem',
            borderTop: '1px solid var(--border)',
            fontFamily: 'var(--mono)', fontSize: '0.65rem',
            color: 'var(--text-muted)', letterSpacing: '0.12em',
            flexWrap: 'wrap', gap: '0.75rem'
          }}>
            <span>PREPARADO POR DAVID GEO</span>
            <span>BOGOTÁ · COLOMBIA</span>
            <span>{quoteId}</span>
          </div>
        </div>
      </section>
    </>
  )
}
