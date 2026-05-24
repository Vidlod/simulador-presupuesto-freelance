import { PROJECT_TYPES, FEATURES, TIMELINES, DESIGNS } from '../data/pricing'

/* ─── Reusable bits ─── */
function SectionLabel({ n, title, hint }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '0.85rem',
        marginBottom: '0.45rem',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.72rem',
          color: 'var(--accent)', letterSpacing: '0.18em',
        }}>0{n} /</span>
        <h2 className="display" style={{
          fontSize: 'clamp(1.65rem, 3vw, 2.2rem)',
          color: 'var(--ink)',
        }}>{title}</h2>
      </div>
      {hint && (
        <p style={{
          fontSize: '0.85rem', color: 'var(--ink-soft)',
          paddingLeft: '0', maxWidth: '40rem', lineHeight: 1.55,
        }}>{hint}</p>
      )}
    </div>
  )
}

function OptionCard({ active, onClick, title, sub, badge, note }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'var(--paper)' : 'var(--ink)',
        border: '1px solid',
        borderColor: active ? 'var(--ink)' : 'var(--line)',
        padding: '1.5rem 1.4rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        transition: 'all 0.3s cubic-bezier(0.19,1,0.22,1)',
        cursor: 'pointer', minHeight: '120px',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--ink-faint)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: 'var(--display)', fontSize: '1.25rem',
          fontStyle: active ? 'italic' : 'normal',
        }}>{title}</span>
        {badge && (
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem',
            color: active ? 'var(--paper)' : 'var(--accent)',
            opacity: active ? 0.85 : 1, letterSpacing: '0.12em',
          }}>{badge}</span>
        )}
      </div>
      <span style={{
        fontSize: '0.85rem',
        color: active ? 'rgba(244,239,227,0.7)' : 'var(--ink-soft)',
      }}>{sub}</span>
      {note && (
        <span style={{
          fontSize: '0.72rem', marginTop: '0.5rem',
          color: active ? 'rgba(244,239,227,0.6)' : 'var(--ink-faint)',
          fontStyle: 'italic',
        }}>— {note}</span>
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

  return (
    <>
      <style>{`
        .form-section {
          padding: 4rem 0;
          border-top: 1px dashed var(--line);
        }
        .form-section:first-of-type { border-top: none; padding-top: 1rem; }

        .opt-grid-4 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        .opt-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
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
          hint="Elige la categoría que mejor describe lo que necesitas. Esto define la base del estimado." />
        <div className="opt-grid-4">
          {PROJECT_TYPES.map(p => (
            <OptionCard key={p.id}
              active={type === p.id}
              onClick={() => set('type', p.id)}
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
            ? 'Las landing pages típicamente tienen una sola página. Mueve el slider si necesitas más secciones.'
            : 'Número aproximado de páginas o pantallas principales.'} />

        <div style={{ padding: '1rem 0 2rem' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: '1.5rem',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--ink-soft)', letterSpacing: '0.12em' }}>
              {minPages} → 30 PÁGINAS
            </span>
            <span className="display" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--ink)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {String(pages).padStart(2, '0')}
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--ink-faint)', marginLeft: '0.6rem', letterSpacing: '0.12em' }}>
                {pages === 1 ? 'PÁGINA' : 'PÁGINAS'}
              </span>
            </span>
          </div>

          <input
            type="range"
            min={minPages}
            max={30}
            value={pages}
            onChange={e => set('pages', Number(e.target.value))}
            aria-label="Number of pages"
          />

          {/* Tick marks */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem',
            fontFamily: 'var(--mono)', fontSize: '0.62rem',
            color: 'var(--ink-faint)', letterSpacing: '0.08em',
          }}>
            {[1, 5, 10, 15, 20, 25, 30].map(n => <span key={n}>{n}</span>)}
          </div>

          {projectDefault && pages > (type === 'landing' ? 1 : 5) && (
            <p style={{
              marginTop: '1.25rem', fontSize: '0.78rem',
              color: 'var(--ink-faint)', fontStyle: 'italic',
            }}>
              · Cada página adicional añade aproximadamente {Math.round(projectDefault.hours * 0.08)}h al estimado base.
            </p>
          )}
        </div>
      </section>

      {/* ─── 03 — FEATURES ─── */}
      <section className="form-section">
        <SectionLabel n="3" title="Funcionalidades extra"
          hint="Marca todas las que necesites. Cada una suma horas al total — la app calcula en tiempo real." />

        <div className="feature-grid">
          {FEATURES.map(f => {
            const active = features.includes(f.id)
            return (
              <button key={f.id}
                onClick={() => toggleFeature(f.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  textAlign: 'left',
                  padding: '0.9rem 1.1rem',
                  background: active ? 'var(--accent-soft)' : 'transparent',
                  border: '1px solid',
                  borderColor: active ? 'var(--accent)' : 'var(--line)',
                  transition: 'all 0.25s',
                  cursor: 'pointer', minHeight: '52px',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--ink-faint)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--line)' }}>
                {/* Custom checkbox */}
                <span style={{
                  width: '18px', height: '18px',
                  border: '1.5px solid',
                  borderColor: active ? 'var(--accent)' : 'var(--ink-faint)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  background: active ? 'var(--accent)' : 'transparent',
                  transition: 'all 0.2s',
                }}>
                  {active && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12L10 17L19 8" stroke="#F4EFE3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>

                <span style={{
                  flex: 1, fontSize: '0.9rem',
                  color: active ? 'var(--ink)' : 'var(--ink-soft)',
                  fontWeight: active ? 500 : 400,
                }}>{f.label}</span>

                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '0.7rem',
                  color: active ? 'var(--accent)' : 'var(--ink-faint)',
                  letterSpacing: '0.08em', flexShrink: 0,
                }}>+{f.hours}h</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ─── 04 — TIMELINE ─── */}
      <section className="form-section">
        <SectionLabel n="4" title="Plazo de entrega"
          hint="Plazos más cortos requieren dedicación exclusiva y aplican un recargo proporcional." />
        <div className="opt-grid-4">
          {TIMELINES.map(t => {
            const pct = Math.round((t.mult - 1) * 100)
            const badge = pct === 0 ? 'BASE' : (pct > 0 ? `+${pct}%` : `${pct}%`)
            return (
              <OptionCard key={t.id}
                active={timeline === t.id}
                onClick={() => set('timeline', t.id)}
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
        <SectionLabel n="5" title="Nivel de diseño"
          hint="¿Cuánto énfasis quieres en el aspecto visual y las micro-interacciones?" />
        <div className="opt-grid-3">
          {DESIGNS.map(d => {
            const pct = Math.round((d.mult - 1) * 100)
            const badge = pct === 0 ? 'ESTÁNDAR' : (pct > 0 ? `+${pct}%` : `${pct}%`)
            return (
              <OptionCard key={d.id}
                active={design === d.id}
                onClick={() => set('design', d.id)}
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
