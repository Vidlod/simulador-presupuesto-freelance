import './index.css'
import { useMemo, useState } from 'react'
import { calculate } from './data/pricing'
import Header from './components/Header'
import Hero from './components/Hero'
import Form from './components/Form'
import Summary from './components/Summary'
import Result from './components/Result'
import Footer from './components/Footer'

function App() {
  const [currency, setCurrency] = useState('USD')

  /* central form state */
  const [state, setState] = useState({
    type: 'landing',
    pages: 1,
    features: ['contactForm'],
    timeline: 'standard',
    design: 'custom',
  })

  const set = (key, value) => {
    // Reset pages if project type changes
    if (key === 'type') {
      const defaultPages = value === 'landing' ? 1 : value === 'site' ? 5 : value === 'webapp' ? 4 : 8
      setState(prev => ({ ...prev, type: value, pages: defaultPages }))
    } else {
      setState(prev => ({ ...prev, [key]: value }))
    }
  }

  /* recalculate whenever state changes */
  const result = useMemo(() => calculate(state), [state])

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Header currency={currency} setCurrency={setCurrency} />
      <Hero />

      <main>
        <style>{`
          .layout {
            max-width: 88rem; margin: 0 auto;
            padding: 0 2rem 4rem;
            display: grid;
            grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
            gap: 4rem;
            align-items: flex-start;
          }
          @media (max-width: 960px) {
            .layout { grid-template-columns: 1fr; gap: 0; }
            .layout aside { position: static !important; margin-top: 3rem; }
          }
          @media (max-width: 640px) {
            .layout { padding: 0 1.25rem 3rem; }
          }
        `}</style>

        <div className="layout">
          <div>
            <Form state={state} set={set} />
          </div>
          <Summary result={result} currency={currency} />
        </div>

        <Result state={state} result={result} currency={currency} />
      </main>

      <Footer />
    </div>
  )
}

export default App
