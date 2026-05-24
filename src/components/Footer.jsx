export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--ink)',
      padding: '2.5rem 2rem 2rem',
      maxWidth: '88rem', margin: '0 auto',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '1rem',
      fontFamily: 'var(--mono)', fontSize: '0.65rem',
      color: 'var(--ink-soft)', letterSpacing: '0.15em',
      textTransform: 'uppercase',
    }}>
      <span>
        Estimador <span style={{ color: 'var(--accent)' }}>·</span>{' '}
        <a href="https://portfolio-david-geo.vercel.app" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          By David Geo
        </a>
      </span>
      <span>© 2026 · Bogotá, COL</span>
    </footer>
  )
}
