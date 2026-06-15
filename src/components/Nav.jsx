import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { id: 'carte', label: 'Carte' },
  { id: 'trous', label: 'Trous' },
  { id: 'diaspora', label: 'Diaspora' },
  { id: 'partenariats', label: 'Partenariats' },
  { id: 'rapport', label: 'Rapport' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('carte')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled ? 'glass-strong border-hair shadow-2xl shadow-black/40' : 'border-transparent'
        }`}
      >
        {/* Marque */}
        <a href="#top" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-copper/40 bg-river">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <polygon points="12,3 19,7.5 19,16.5 12,21 5,16.5 5,7.5" fill="none" stroke="#f0a868" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="2.6" fill="#e8b84b" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display text-sm font-semibold tracking-wide text-ink">Observatoire</div>
            <div className="font-mono text-[0.56rem] tracking-[0.18em] text-faint">CCNE · RDC</div>
          </div>
        </a>

        {/* Liens (scrollspy) */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-ink"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/8"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative ${active === l.id ? 'text-ink' : ''}`}>{l.label}</span>
            </a>
          ))}
        </div>

        {/* Statut + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-hair bg-river/50 px-3 py-1.5 sm:flex">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-mono text-[0.6rem] tracking-wider text-muted">PILOTE · LIVE</span>
          </div>
          <a
            href="#carte"
            className="font-display rounded-full bg-gradient-to-r from-copper to-gold px-4 py-2 text-sm font-semibold text-abyss transition-transform hover:scale-[1.03]"
          >
            Explorer
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
