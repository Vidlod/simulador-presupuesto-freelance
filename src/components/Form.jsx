import { PROJECT_TYPES, FEATURES, TIMELINES, DESIGNS } from '../data/pricing'

/* ─── SVG Icons Helper ─── */
function getIcon(id, className = "w-5 h-5") {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { width: '1.25rem', height: '1.25rem', flexShrink: 0 }
  }

  switch (id) {
    // Project Types
    case 'landing':
      return (
        <svg {...props}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      )
    case 'site':
      return (
        <svg {...props}>
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    case 'webapp':
      return (
        <svg {...props}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
          <line x1="12" y1="17" x2="12" y2="20" />
        </svg>
      )
    case 'maintenance':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
      )

    // Features
    case 'contactForm':
      return (
        <svg {...props}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    case 'gallery':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      )
    case 'blog':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      )
    case 'multilang':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 'animations':
      return (
        <svg {...props}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    case 'seo':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )
    case 'auth':
      return (
        <svg {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    case 'payments':
      return (
        <svg {...props}>
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      )
    case 'cart':
      return (
        <svg {...props}>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    case 'api':
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      )
    case 'admin':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M21 9H3M21 15H3M12 3v18" />
        </svg>
      )
    case 'analytics':
      return (
        <svg {...props}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )

    // Timelines
    case 'flexible':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'standard':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    case 'fast':
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    case 'express':
      return (
        <svg {...props}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )

    // Designs
    case 'template':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
      )
    case 'custom':
      return (
        <svg {...props}>
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 8A4 4 0 1 0 12 16 A4 4 0 1 0 12 8" />
        </svg>
      )
    case 'premium':
      return (
        <svg {...props}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )

    default:
      return null
  }
}

/* ─── Reusable Bits ─── */
function SectionLabel({ n, title, hint }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '0.5rem',
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '0.72rem',
          color: 'var(--primary)', letterSpacing: '0.12em',
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '0.2rem 0.6rem',
          borderRadius: '4px',
          fontWeight: 700
        }}>
          FASE 0{n}
        </div>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
          fontWeight: '700',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>{title}</h2>
      </div>
      {hint && (
        <p style={{
          fontSize: '0.88rem', color: 'var(--text-secondary)',
          lineHeight: 1.5, maxWidth: '44rem',
        }}>{hint}</p>
      )}
    </div>
  )
}

function OptionCard({ active, onClick, id, title, sub, badge, note }) {
  return (
    <button
      onClick={onClick}
      className="glass-card"
      style={{
        textAlign: 'left',
        background: active ? 'rgba(59, 130, 246, 0.08)' : 'var(--surface-glass)',
        borderColor: active ? 'var(--primary)' : 'var(--border)',
        padding: '1.5rem 1.25rem',
        display: 'flex', flexDirection: 'column', gap: '0.65rem',
        cursor: 'pointer', minHeight: '135px',
        position: 'relative', overflow: 'hidden',
        width: '100%',
        boxShadow: active ? '0 0 20px rgba(59, 130, 246, 0.15)' : 'var(--shadow-sm)'
      }}>
      
      {/* Glow highlight for active state */}
      {active && (
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '40px', height: '40px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: active ? 'var(--primary)' : 'var(--text-primary)' }}>
          {getIcon(id, "w-5 h-5")}
          <span style={{
            fontSize: '1.1rem',
            fontWeight: active ? '700' : '600',
            letterSpacing: '-0.01em',
          }}>{title}</span>
        </div>
        {badge && (
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.68rem',
            color: active ? 'var(--text-primary)' : 'var(--accent)',
            background: active ? 'var(--primary)' : 'rgba(16, 185, 129, 0.1)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>{badge}</span>
        )}
      </div>

      <span style={{
        fontSize: '0.85rem',
        color: active ? '#cbd5e1' : 'var(--text-secondary)',
        lineHeight: 1.45,
      }}>{sub}</span>

      {note && (
        <span style={{
          fontSize: '0.75rem', marginTop: 'auto',
          color: active ? '#94a3b8' : 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: '0.25rem'
        }}>
          <svg style={{ width: '12px', height: '12px', opacity: 0.7 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          {note}
        </span>
      )}
    </button>
  )
}

/* ─── Main Form component ─── */
export default function Form({ state, set }) {
  const { type, pages, features, timeline, design } = state

  const toggleFeature = (id) =>
    set('features', features.includes(id) ? features.filter(f => f !== id) : [...features, id])

  const projectDefault = PROJECT_TYPES.find(p => p.id === type)
  const minPages = type === 'landing' ? 1 : 2

  // Calculate percentage of range for CSS styling
  const sliderPercentage = ((pages - minPages) / (30 - minPages)) * 100

  return (
    <>
      <style>{`
        .form-section {
          padding: 3rem 0;
          border-top: 1px solid var(--border);
        }
        .form-section:first-of-type { border-top: none; padding-top: 0.5rem; }

        .opt-grid-4 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .opt-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        
        .preset-btn {
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }
        .preset-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: var(--primary);
          color: var(--text-primary);
        }
        
        @media (max-width: 720px) {
          .opt-grid-4 { grid-template-columns: 1fr; }
          .opt-grid-3 { grid-template-columns: 1fr; }
          .feature-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ─── 01 — TYPE ─── */}
      <section className="form-section">
        <SectionLabel n="1" title="Tipo de proyecto"
          hint="Selecciona la estructura principal. La complejidad y horas base dependen directamente de esta categoría." />
        <div className="opt-grid-4">
          {PROJECT_TYPES.map(p => (
            <OptionCard key={p.id}
              active={type === p.id}
              onClick={() => set('type', p.id)}
              id={p.id}
              title={p.title}
              sub={p.sub}
              badge={`${p.hours}h base`}
              note={p.note}
            />
          ))}
        </div>
      </section>

      {/* ─── 02 — PAGES ─── */}
      <section className="form-section">
        <SectionLabel n="2" title="Tamaño del proyecto"
          hint={type === 'landing'
            ? 'Las páginas de aterrizaje suelen ser de una sola sección extendida. Aumenta las secciones si requiere sub-vistas.'
            : 'Especifica la cantidad estimada de vistas internas, secciones principales o pantallas clave.'} />

        <div className="glass-card" style={{ padding: '1.75rem', marginTop: '1rem' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Escala estimada
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {minPages} a 30 páginas
              </span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'baseline', gap: '0.25rem',
              background: 'rgba(59, 130, 246, 0.08)', padding: '0.4rem 1rem',
              borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 0 10px rgba(59,130,246,0.1)'
            }}>
              <span style={{
                fontSize: '2rem', color: 'var(--primary)',
                fontWeight: '800', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {pages}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                {pages === 1 ? 'PÁGINA' : 'PÁGINAS'}
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', padding: '0.5rem 0' }}>
            <input
              type="range"
              min={minPages}
              max={30}
              value={pages}
              style={{ '--percent': `${sliderPercentage}%` }}
              onChange={e => set('pages', Number(e.target.value))}
              aria-label="Number of pages"
            />
          </div>

          {/* Preset Buttons for faster selection */}
          <div style={{
            display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '0.25rem' }}>Accesos rápidos:</span>
            {[minPages, 5, 10, 15, 25].map(preset => {
              if (preset < minPages) return null;
              return (
                <button
                  key={preset}
                  type="button"
                  className="preset-btn"
                  style={{
                    background: pages === preset ? 'rgba(59, 130, 246, 0.15)' : '',
                    borderColor: pages === preset ? 'var(--primary)' : '',
                    color: pages === preset ? 'var(--text-primary)' : ''
                  }}
                  onClick={() => set('pages', preset)}>
                  {preset} pág.
                </button>
              )
            })}
          </div>

          {projectDefault && pages > (type === 'landing' ? 1 : 5) && (
            <div style={{
              marginTop: '1.25rem', fontSize: '0.8rem',
              color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)',
              borderRadius: '8px', borderLeft: '3px solid var(--primary)'
            }}>
              <span>
                Cada página adicional sobre el estándar suma unas <strong>{Math.round(projectDefault.hours * 0.08)}h</strong> de maquetación e integración.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ─── 03 — FEATURES ─── */}
      <section className="form-section">
        <SectionLabel n="3" title="Funcionalidades del sistema"
          hint="Equipa el proyecto con los módulos necesarios. Cada característica añade un tiempo estimado de desarrollo." />

        <div className="feature-grid">
          {FEATURES.map(f => {
            const active = features.includes(f.id)
            return (
              <button key={f.id}
                onClick={() => toggleFeature(f.id)}
                className="glass-card"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  textAlign: 'left',
                  padding: '1rem 1.15rem',
                  background: active ? 'rgba(16, 185, 129, 0.06)' : 'var(--surface-glass)',
                  borderColor: active ? 'var(--accent)' : 'var(--border)',
                  cursor: 'pointer', minHeight: '60px',
                  boxShadow: active ? '0 0 15px rgba(16, 185, 129, 0.1)' : 'var(--shadow-sm)',
                  borderRadius: '12px',
                  width: '100%'
                }}>
                
                {/* Checkbox indicator */}
                <div style={{
                  width: '20px', height: '20px',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: active ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifycontent: 'center',
                  background: active ? 'var(--accent)' : 'transparent',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}>
                  {active && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ margin: 'auto' }}>
                      <path d="M5 12L10 17L19 8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                {/* SVG Icon */}
                <div style={{
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center'
                }}>
                  {getIcon(f.id)}
                </div>

                {/* Title */}
                <span style={{
                  flex: 1, fontSize: '0.88rem',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: active ? '600' : '450',
                }}>{f.label}</span>

                {/* Hours badge */}
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.72rem',
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                  fontWeight: 700,
                  letterSpacing: '0.02em', flexShrink: 0,
                  background: active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '6px'
                }}>+{f.hours}h</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ─── 04 — TIMELINE ─── */}
      <section className="form-section">
        <SectionLabel n="4" title="Plazo y prioridad"
          hint="La velocidad de entrega afecta la dedicación necesaria. Plazos express aplican recargos de prioridad." />
        <div className="opt-grid-4">
          {TIMELINES.map(t => {
            const pct = Math.round((t.mult - 1) * 100)
            const badge = pct === 0 ? 'ESTÁNDAR' : (pct > 0 ? `+${pct}% TARIFA` : `${pct}% DESCTO.`)
            return (
              <OptionCard key={t.id}
                active={timeline === t.id}
                onClick={() => set('timeline', t.id)}
                id={t.id}
                title={t.label}
                sub={t.sub}
                badge={badge}
                note={t.note}
              />
            )
          })}
        </div>
      </section>

      {/* ─── 05 — DESIGN ─── */}
      <section className="form-section">
        <SectionLabel n="5" title="Acabado visual y UI/UX"
          hint="Nivel de detalle del diseño. El diseño premium añade animaciones custom y acabados interactivos." />
        <div className="opt-grid-3">
          {DESIGNS.map(d => {
            const pct = Math.round((d.mult - 1) * 100)
            const badge = pct === 0 ? 'TARIFA BASE' : (pct > 0 ? `+${pct}%` : `${pct}%`)
            return (
              <OptionCard key={d.id}
                active={design === d.id}
                onClick={() => set('design', d.id)}
                id={d.id}
                title={d.label}
                sub={d.sub}
                badge={badge}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
