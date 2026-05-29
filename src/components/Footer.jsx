export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--fg)',
      padding: '1.5rem 2rem',
      maxWidth: '88rem', margin: '0 auto',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '0.75rem',
      fontSize: '0.6rem', color: 'var(--fg-3)',
      letterSpacing: '0.18em', textTransform: 'uppercase',
    }}>
      <span>
        ESTIMADOR{' '}
        <span style={{ color: 'var(--accent)' }}>·</span>{' '}
        <a
          href="https://portfolio-david-geo.vercel.app"
          target="_blank" rel="noopener noreferrer"
          style={{
            color: 'var(--fg)', textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}>
          DAVID GEO
        </a>
      </span>
      <span>© 2026 · BOGOTÁ, COL</span>
    </footer>
  )
}
