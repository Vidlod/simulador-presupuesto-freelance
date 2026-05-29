export default function Hero() {
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  })

  const steps = [
    ['01', 'TIPO'],
    ['02', 'TAMAÑO'],
    ['03', 'FUNCIONES'],
    ['04', 'PLAZO'],
    ['05', 'DISEÑO'],
    ['→',  'TOTAL'],
  ]

  return (
    <section style={{
      maxWidth: '88rem', margin: '0 auto',
      padding: 'clamp(3rem, 6vw, 5rem) 2rem clamp(2.5rem, 5vw, 4rem)',
      borderBottom: '1px solid var(--line)',
    }}>

      {/* Document meta */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.6rem', color: 'var(--fg-3)',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        paddingBottom: '0.85rem', marginBottom: '3.5rem',
        borderBottom: '1px solid var(--line-2)',
      }}>
        <span>SHEET 01 / 02</span>
        <span>BUDGET ESTIMATE</span>
        <span>{today}</span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: 'clamp(2rem, 6.5vw, 5rem)',
        fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0,
        maxWidth: '16ch', marginBottom: '1.75rem',
        animation: 'fadeUp 0.7s 0.1s both',
      }}>
        ¿Cuánto cuesta<br/>
        tu <span style={{ color: 'var(--accent)' }}>próximo<br/>proyecto</span> web?
      </h1>

      <p style={{
        fontSize: '0.85rem', color: 'var(--fg-2)', lineHeight: 1.7,
        maxWidth: '50rem', marginBottom: '3rem',
        animation: 'fadeUp 0.7s 0.22s both',
      }}>
        Estimación instantánea basada en alcance, funcionalidades y plazo.
        Configura los parámetros y obtén un rango de presupuesto antes de
        solicitar una cotización formal.
      </p>

      {/* Step indicators */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        animation: 'fadeUp 0.7s 0.36s both',
      }}>
        {steps.map(([n, label], i) => {
          const isLast = n === '→'
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.5rem 1rem',
              border: `1px solid ${isLast ? 'var(--accent)' : 'var(--line)'}`,
              marginRight: '-1px', marginBottom: '-1px',
              fontSize: '0.65rem', letterSpacing: '0.12em',
              color: isLast ? 'var(--accent)' : 'var(--fg-2)',
            }}>
              <span style={{
                fontWeight: 700,
                color: isLast ? 'var(--accent)' : 'var(--fg)',
              }}>{n}</span>
              {label}
            </div>
          )
        })}
      </div>
    </section>
  )
}
