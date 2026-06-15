import { motion } from 'framer-motion'
import { Counter, Magnetic } from './ui.jsx'
import {
  TOTAL_PME,
  TOTAL_PROVINCES,
  TOTAL_SECTORS,
  TOTAL_PARTNERSHIPS,
  SECTORS,
} from '../data/observatory.js'

const STATS = [
  { label: 'PME cartographiées', to: TOTAL_PME },
  { label: 'Provinces couvertes', to: TOTAL_PROVINCES },
  { label: 'Secteurs suivis', to: TOTAL_SECTORS },
  { label: 'Partenariats actifs', to: TOTAL_PARTNERSHIPS },
]

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <header id="top" className="relative mx-auto max-w-7xl px-6 pt-32 sm:pt-40">
      {/* badge institutionnel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex justify-center"
      >
        <div className="glass inline-flex items-center gap-2.5 rounded-full border border-hair px-4 py-1.5">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-mono text-[0.66rem] tracking-[0.18em] text-copper-bright">
            CCNE — RÉPUBLIQUE DÉMOCRATIQUE DU CONGO · ÉDITION PILOTE
          </span>
        </div>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        className="font-display mx-auto mt-7 max-w-5xl text-center text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-[4.5rem]"
      >
        L’<span className="text-gradient-flow">Observatoire</span> de l’Écosystème
        <br className="hidden sm:block" /> Entrepreneurial Congolais
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.22, ease }}
        className="mx-auto mt-7 max-w-2xl text-pretty text-center text-lg leading-relaxed text-muted"
      >
        La cartographie stratégique permanente des PME, partenariats et opportunités diaspora.
        Un instrument de la CCNE qui transforme son réseau existant en
        <span className="text-ink"> intelligence économique structurée</span>.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.34, ease }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic
          href="#carte"
          className="font-display group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-copper to-gold px-6 py-3 text-sm font-semibold text-abyss shadow-lg shadow-copper/20"
        >
          Explorer la carte des 26 provinces
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Magnetic>
        <Magnetic
          href="#rapport"
          strength={0.2}
          className="font-display inline-flex items-center gap-2 rounded-full border border-hair px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-copper/50 hover:text-copper-bright"
        >
          Aperçu du rapport trimestriel
        </Magnetic>
      </motion.div>

      {/* Barre de statistiques (bento) */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.46, ease }}
        className="border-glow glass card-sheen mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hair lg:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="relative bg-river/30 px-6 py-7 transition-colors hover:bg-river/50">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="font-display mt-2 text-4xl font-bold text-ink sm:text-[2.9rem]">
              <Counter to={s.to} />
            </div>
            <div className="mt-1.5 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Marquee des secteurs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="marquee-mask mt-10 overflow-hidden"
      >
        <div className="marquee-track gap-3">
          {[...SECTORS, ...SECTORS].map((s, i) => (
            <span
              key={i}
              className="font-mono mx-1.5 inline-flex items-center gap-2 rounded-full border border-hair px-4 py-1.5 text-xs text-muted"
            >
              <span className="h-1 w-1 rounded-full bg-copper" />
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </header>
  )
}
