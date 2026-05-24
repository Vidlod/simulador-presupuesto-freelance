/**
 * Pricing engine — Calculates an estimated project cost.
 *
 * Disclosure: This is an estimation tool. Real quotes require conversation.
 * All hours are based on average freelance dev workload (incl. design + dev + QA + revisions).
 */

export const HOURLY_RATE_USD = 10       // USD / hour (mid-tier LATAM freelance)
export const USD_TO_COP = 4000          // approx — could be live from API later

export const PROJECT_TYPES = [
  {
    id: 'landing',
    title: 'Landing Page',
    sub: 'Una sola página optimizada para conversión',
    hours: 28,
    note: 'Hero, secciones, formulario, deploy.',
  },
  {
    id: 'site',
    title: 'Sitio / Portafolio',
    sub: 'Sitio multi-página corporativo o personal',
    hours: 55,
    note: 'Estructura, navegación, sistema visual completo.',
  },
  {
    id: 'webapp',
    title: 'Web App',
    sub: 'Dashboard o herramienta interactiva',
    hours: 110,
    note: 'Lógica, base de datos, autenticación.',
  },
  {
    id: 'maintenance',
    title: 'Mantenimiento & Soporte',
    sub: 'Plan mensual de soporte y mejoras continuas',
    hours: 20,
    note: 'Actualizaciones, bugs, mejoras de rendimiento y soporte.',
  },
]

export const FEATURES = [
  { id: 'contactForm',  label: 'Formulario de contacto',        hours: 3 },
  { id: 'gallery',       label: 'Galería con lightbox',          hours: 4 },
  { id: 'blog',          label: 'Blog / CMS editable',           hours: 12 },
  { id: 'multilang',     label: 'Multi-idioma (ES/EN)',          hours: 8 },
  { id: 'animations',    label: 'Animaciones avanzadas',         hours: 7 },
  { id: 'seo',           label: 'SEO técnico avanzado',          hours: 5 },
  { id: 'auth',          label: 'Autenticación de usuarios',     hours: 16 },
  { id: 'payments',      label: 'Pagos integrados (Stripe/MP)',  hours: 20 },
  { id: 'cart',          label: 'Carrito de compras',            hours: 25 },
  { id: 'api',           label: 'Integración con APIs externas', hours: 12 },
  { id: 'admin',         label: 'Panel de administración',       hours: 30 },
  { id: 'analytics',     label: 'Analytics + dashboard',         hours: 6 },
]

export const TIMELINES = [
  { id: 'flexible', label: 'Flexible',  sub: '6+ semanas',  mult: 0.92, note: 'Trabajo a ritmo estándar, mejor precio.' },
  { id: 'standard', label: 'Estándar',  sub: '4–6 semanas', mult: 1.00, note: 'El plazo recomendado para la mayoría de proyectos.' },
  { id: 'fast',     label: 'Acelerado', sub: '2–3 semanas', mult: 1.30, note: 'Prioridad alta, dedicación extra.' },
  { id: 'express',  label: 'Express',   sub: '< 2 semanas',  mult: 1.70, note: 'Modo full-focus, requiere disponibilidad inmediata.' },
]

export const DESIGNS = [
  { id: 'template', label: 'A partir de plantilla',  sub: 'Personalización ligera',     mult: 0.85 },
  { id: 'custom',   label: 'Diseño a medida',         sub: 'Mockups + identidad',         mult: 1.00 },
  { id: 'premium',  label: 'Premium con animaciones', sub: 'Micro-interacciones + motion',mult: 1.25 },
]

/**
 * Core calculation
 */
export function calculate({ type, pages, features, timeline, design }) {
  if (!type || !timeline || !design) return null

  const projectType = PROJECT_TYPES.find(p => p.id === type)
  if (!projectType) return null

  const baseHours = projectType.hours

  // Pages: 8% extra per additional page above the project default
  const defaultPages = type === 'landing' ? 1 : type === 'site' ? 5 : type === 'webapp' ? 4 : type === 'maintenance' ? 1 : 8
  const extraPages   = Math.max(0, pages - defaultPages)
  const pagesHours   = extraPages * (baseHours * 0.08)

  // Features
  const featureHours = features.reduce((sum, fid) => {
    const f = FEATURES.find(x => x.id === fid)
    return sum + (f ? f.hours : 0)
  }, 0)

  const subTotalHours = baseHours + pagesHours + featureHours

  const timelineMult = TIMELINES.find(t => t.id === timeline)?.mult ?? 1
  const designMult   = DESIGNS.find(d => d.id === design)?.mult ?? 1

  const totalHours = Math.round(subTotalHours * timelineMult * designMult)
  const totalUSD   = totalHours * HOURLY_RATE_USD
  const totalCOP   = totalUSD * USD_TO_COP

  // ±15% estimation range
  const minUSD = Math.round(totalUSD * 0.85)
  const maxUSD = Math.round(totalUSD * 1.15)
  const minCOP = minUSD * USD_TO_COP
  const maxCOP = maxUSD * USD_TO_COP

  return {
    baseHours,
    pagesHours: Math.round(pagesHours),
    featureHours,
    subTotalHours: Math.round(subTotalHours),
    timelineMult,
    designMult,
    totalHours,
    totalUSD,
    totalCOP,
    minUSD, maxUSD, minCOP, maxCOP,
    projectType: projectType.title,
    weeks: estimateWeeks(totalHours, timeline),
  }
}

function estimateWeeks(hours, timeline) {
  // assuming 25 productive hrs/week standard, 35 fast, 45 express, 18 flexible
  const hrsPerWeek = { flexible: 18, standard: 25, fast: 35, express: 45 }[timeline] || 25
  return Math.max(1, Math.ceil(hours / hrsPerWeek))
}

/* ─── Money formatting ─── */
export function formatMoney(amount, currency) {
  if (currency === 'COP') {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', maximumFractionDigits: 0,
    }).format(amount)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(amount)
}
