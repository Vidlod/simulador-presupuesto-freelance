import { PROJECT_TYPES, FEATURES, TIMELINES, DESIGNS } from '../data/pricing'

/* ─── Section label ─── */
function SecLabel({ n, title, hint }) {
  return (
    <div style={{ marginBottom: '2rem', paddingTop: '0.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '0.6rem' }}>
        <span style={{
          fontSize: '0.58rem', fontWeight: 700,
          color: 'var(--fg-3)', letterSpacing: '0.22em',
          textTransform: 'uppercase', flexShrink: 0,
        }}>
          FASE {n.toString().padStart(2,'0')}
        </span>
        <h2 style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          fontWeight: 700, letterSpacing: '-0.015em',
        }}>
          {title}
        </h2>
      </div>
      {hint && (
        <p style={{
          fontSize: '0.78rem', color: 'var(--fg-2)', lineHeight: 1.6,
          maxWidth: '50rem',
        }}>{hint}</p>
      )}
    </div>
  )
}

/* ─── Option card — pure inversion, no colors ─── */
function OptCard({ active, onClick, title, sub, badge, note, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left', width: '100%',
        padding: '1.25rem 1.1rem',
        border: `1px solid ${active ? 'var(--fg)' : 'var(--line)'}`,
        background: active ? 'var(--fg)' : 'var(--surface)',
        color: active ? 'var(--bg)' : 'var(--fg)',
        display: 'flex', flexDirection: 'column', gap: '0.55rem',
        cursor: 'pointer', minHeight: '120px',
        transition: 'background 0.12s, color 0.12s, border-color 0.12s',
      }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.55rem',
          fontSize: '0.88rem', fontWeight: 700, letterSpacing: '-0.01em',
        }}>
          <span style={{ opacity: active ? 0.85 : 0.5 }}>{icon}</span>
          {title}
        </div>
        {badge && (
          <span style={{
            fontSize: '0.6rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.2rem 0.55rem',
            border: `1px solid ${active ? 'rgba(248,248,246,0.3)' : 'var(--line)'}`,
            color: active ? 'var(--bg)' : 'var(--fg-2)',
            flexShrink: 0, whiteSpace: 'nowrap',
          }}>{badge}</span>
        )}
      </div>

      <span style={{
        fontSize: '0.78rem', lineHeight: 1.45,
        color: active ? 'rgba(248,248,246,0.75)' : 'var(--fg-2)',
      }}>{sub}</span>

      {note && (
        <span style={{
          fontSize: '0.7rem', marginTop: 'auto',
          color: active ? 'rgba(248,248,246,0.5)' : 'var(--fg-3)',
        }}>
          / {note}
        </span>
      )}
    </button>
  )
}

/* ─── Small SVG icons (monochrome) ─── */
function Icon({ id }) {
  const s = { width: '14px', height: '14px', flexShrink: 0, strokeWidth: 1.8 }
  const p = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', ...s }
  switch (id) {
    case 'landing':     return <svg {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
    case 'site':        return <svg {...p}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
    case 'webapp':      return <svg {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/><line x1="12" y1="17" x2="12" y2="20"/></svg>
    case 'maintenance': return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
    case 'flexible':    return <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    case 'standard':    return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    case 'fast':        return <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    case 'express':     return <svg {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    case 'template':    return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
    case 'custom':      return <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
    case 'premium':     return <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    default: return null
  }
}

/* ─── Main Form ─── */
export default function Form({ state, set }) {
  const { type, pages, features, timeline, design } = state

  const toggleFeature = id =>
    set('features', features.includes(id) ? features.filter(f => f !== id) : [...features, id])

  const minPages = type === 'landing' ? 1 : 2
  const projectDefault = PROJECT_TYPES.find(p => p.id === type)

  return (
    <>
      <style>{`
        .fsec {
          padding: 2.75rem 0;
          border-top: 1px solid var(--line-2);
        }
        .fsec:first-of-type { border-top: none; padding-top: 0.5rem; }

        .ogrid-4 { display: grid; grid-template-columns: repeat(2,1fr); gap: 1px; }
        .ogrid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; }
        .fgrid   { display: grid; grid-template-columns: repeat(2,1fr); gap: 1px; }

        .frow {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.85rem 1rem;
          border: 1px solid var(--line);
          cursor: pointer;
          background: var(--surface);
          transition: background 0.1s, color 0.1s;
          min-height: 52px;
          width: 100%;
          text-align: left;
        }
        .frow.on { background: var(--fg); color: var(--bg); }
        .frow:not(.on):hover { background: var(--line-2); }

        .fcheck {
          width: 16px; height: 16px; border: 1px solid currentColor;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .frow.on .fcheck { background: var(--bg); }

        .frow-label { flex: 1; font-size: 0.8rem; }
        .frow-hrs {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .frow.on .frow-hrs { color: rgba(248,248,246,0.6); }

        .preset-row {
          display: flex; flex-wrap: wrap; gap: 0; margin-top: 1px;
        }
        .preset-btn {
          padding: 0.4rem 0.75rem;
          border: 1px solid var(--line);
          margin-right: -1px;
          background: var(--surface);
          font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.06em;
          color: var(--fg-2);
          transition: background 0.1s, color 0.1s;
          cursor: pointer;
        }
        .preset-btn.on { background: var(--fg); color: var(--bg); border-color: var(--fg); }
        .preset-btn:not(.on):hover { background: var(--line-2); }

        @media (max-width: 720px) {
          .ogrid-4 { grid-template-columns: 1fr; }
          .ogrid-3 { grid-template-columns: 1fr; }
          .fgrid   { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ─── 01 TIPO ─── */}
      <section className="fsec">
        <SecLabel n={1} title="Tipo de proyecto"
          hint="Selecciona la estructura principal. Las horas base y la complejidad dependen de esta categoría." />
        <div className="ogrid-4">
          {PROJECT_TYPES.map(p => (
            <OptCard key={p.id}
              active={type === p.id}
              onClick={() => set('type', p.id)}
              title={p.title} sub={p.sub}
              badge={`${p.hours}h`}
              note={p.note}
              icon={<Icon id={p.id} />}
            />
          ))}
        </div>
      </section>

      {/* ─── 02 TAMAÑO ─── */}
      <section className="fsec">
        <SecLabel n={2} title="Tamaño del proyecto"
          hint={type === 'landing'
            ? 'Páginas de aterrizaje suelen ser una sola sección extendida. Aumenta si requiere sub-vistas.'
            : 'Cantidad estimada de vistas, secciones principales o pantallas clave.'} />

        <div style={{
          border: '1px solid var(--line)', background: 'var(--surface)',
          padding: '1.5rem',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--fg-2)', letterSpacing: '0.08em' }}>
              {minPages} — 30 PÁGINAS
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
              <span style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700,
                letterSpacing: '-0.03em', lineHeight: 1,
                color: 'var(--fg)', fontVariantNumeric: 'tabular-nums',
              }}>{pages}</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
                {pages === 1 ? 'PÁG.' : 'PÁGS.'}
              </span>
            </div>
          </div>

          <input
            type="range" min={minPages} max={30} value={pages}
            onChange={e => set('pages', Number(e.target.value))}
            aria-label="Número de páginas"
          />

          {/* Presets */}
          <div className="preset-row" style={{ marginTop: '1.25rem' }}>
            <span style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.6rem', color: 'var(--fg-3)', letterSpacing: '0.15em',
              border: '1px solid var(--line-2)', marginRight: '-1px',
              display: 'flex', alignItems: 'center',
            }}>ACCESO RÁPIDO</span>
            {[minPages, 5, 10, 15, 25].filter(p => p >= minPages).map(preset => (
              <button key={preset} type="button"
                className={`preset-btn ${pages === preset ? 'on' : ''}`}
                onClick={() => set('pages', preset)}>
                {preset}
              </button>
            ))}
          </div>

          {projectDefault && pages > (type === 'landing' ? 1 : 5) && (
            <p style={{
              marginTop: '1rem', padding: '0.75rem 1rem',
              borderLeft: '2px solid var(--fg)',
              fontSize: '0.75rem', color: 'var(--fg-2)', lineHeight: 1.5,
              background: 'var(--bg)',
            }}>
              Cada página adicional sobre el estándar añade ~{Math.round(projectDefault.hours * 0.08)}h.
            </p>
          )}
        </div>
      </section>

      {/* ─── 03 FUNCIONALIDADES ─── */}
      <section className="fsec">
        <SecLabel n={3} title="Funcionalidades del sistema"
          hint="Cada módulo suma horas de desarrollo al estimado base." />
        <div className="fgrid">
          {FEATURES.map(f => {
            const on = features.includes(f.id)
            return (
              <button key={f.id} className={`frow ${on ? 'on' : ''}`}
                onClick={() => toggleFeature(f.id)}>
                <span className="fcheck">
                  {on && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: 'auto' }}>
                      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className="frow-label">{f.label}</span>
                <span className="frow-hrs">+{f.hours}H</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ─── 04 PLAZO ─── */}
      <section className="fsec">
        <SecLabel n={4} title="Plazo y prioridad"
          hint="Los plazos express aplican recargos de prioridad; el plazo flexible ofrece el mejor precio." />
        <div className="ogrid-4">
          {TIMELINES.map(t => {
            const pct = Math.round((t.mult - 1) * 100)
            const badge = pct === 0 ? 'BASE' : pct > 0 ? `+${pct}%` : `${pct}%`
            return (
              <OptCard key={t.id}
                active={timeline === t.id}
                onClick={() => set('timeline', t.id)}
                title={t.label} sub={t.sub}
                badge={badge} note={t.note}
                icon={<Icon id={t.id} />}
              />
            )
          })}
        </div>
      </section>

      {/* ─── 05 DISEÑO ─── */}
      <section className="fsec">
        <SecLabel n={5} title="Acabado visual y UI/UX"
          hint="El nivel de detalle del diseño. Premium incluye animaciones custom y microinteracciones." />
        <div className="ogrid-3">
          {DESIGNS.map(d => {
            const pct = Math.round((d.mult - 1) * 100)
            const badge = pct === 0 ? 'BASE' : pct > 0 ? `+${pct}%` : `${pct}%`
            return (
              <OptCard key={d.id}
                active={design === d.id}
                onClick={() => set('design', d.id)}
                title={d.label} sub={d.sub}
                badge={badge}
                icon={<Icon id={d.id} />}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
