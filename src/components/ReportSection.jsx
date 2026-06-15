import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal, SectionHead, Counter, SpotlightCard } from './ui.jsx'
import { AVG_DYNAMISM, TOTAL_GAPS, TOTAL_PROVINCES } from '../data/observatory.js'

const KPIS = [
  { label: 'Indice de dynamisme national moyen', to: AVG_DYNAMISM, suffix: '/100' },
  { label: 'Trous stratégiques prioritaires', to: TOTAL_GAPS, suffix: '' },
  { label: 'Provinces sous couverture', to: TOTAL_PROVINCES, suffix: '/26' },
]

function TiltCover() {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="card-sheen border-glow relative aspect-[3/4] overflow-hidden rounded-3xl border border-copper/25 sm:aspect-[4/4.4]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#11332c] via-[#0c2521] to-[#06140f]" />
        <div className="pointer-events-none absolute right-[-20%] top-[-10%] h-72 w-72 rounded-full bg-copper/25 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-64 w-64 rounded-full bg-gold/15 blur-[90px]" />

        <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <polygon points="50,8 86,29 86,71 50,92 14,71 14,29" fill="none" stroke="#f0a868" strokeWidth="0.5" />
          <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" fill="none" stroke="#e8b84b" strokeWidth="0.4" />
        </svg>

        <div className="relative flex h-full flex-col justify-between p-7 sm:p-9" style={{ transform: 'translateZ(40px)' }}>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-copper-bright">CCNE · Observatoire</span>
            </div>
            <div className="font-mono mt-8 text-[0.66rem] tracking-wider text-faint">RAPPORT DE L’OBSERVATOIRE</div>
            <h3 className="font-display mt-2 text-4xl font-bold leading-tight text-ink">Édition 01</h3>
            <p className="font-mono mt-2 text-sm tracking-wide text-copper-bright">Trimestre 3 · 2026</p>
          </div>

          <div>
            <div className="h-px w-full bg-gradient-to-r from-copper/50 to-transparent" />
            <p className="mt-4 text-[0.8rem] leading-relaxed text-muted">
              Cartographie de l’écosystème · Diagnostic des trous · Lecture diaspora · État des partenariats.
            </p>
            <div className="font-mono mt-5 inline-flex items-center gap-2 rounded-full border border-hair px-3 py-1.5 text-[0.6rem] tracking-wide text-muted">
              Maquette de démonstration — données illustratives
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ReportSection() {
  return (
    <section id="rapport" className="mx-auto mt-32 max-w-7xl scroll-mt-24 px-6">
      <SectionHead
        eyebrow="Le produit récurrent"
        title="Le Rapport de l’Observatoire"
        lead="La carte est l’instrument ; le rapport est le livrable. Une publication trimestrielle qui condense l’état de l’écosystème, alimente les événements de la CCNE et sert de levier de financement."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <TiltCover />
        </Reveal>

        <div className="flex flex-col gap-5">
          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {KPIS.map((k) => (
                <SpotlightCard key={k.label} className="glass card-sheen rounded-3xl border border-hair p-5">
                  <div className="font-display text-3xl font-bold text-gradient-copper">
                    <Counter to={k.to} />
                    <span className="text-xl text-copper-bright/70">{k.suffix}</span>
                  </div>
                  <div className="mt-2 text-[0.82rem] leading-snug text-muted">{k.label}</div>
                </SpotlightCard>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <SpotlightCard className="glass card-sheen flex-1 rounded-3xl border border-hair p-7">
              <h4 className="font-display text-xl font-semibold text-ink">Une cadence trimestrielle</h4>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
                Chaque trimestre, l’Observatoire publie une édition : un instantané chiffré de l’écosystème
                et de son évolution. Le rapport se présente en événement (forums, rencontres diaspora,
                tables rondes provinciales) et constitue un dossier de référence opposable aux bailleurs et partenaires.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { t: 'Publication', d: 'Document de référence diffusé aux membres et institutions.' },
                  { t: 'Présentation', d: 'Support de plaidoyer lors des événements de la CCNE.' },
                  { t: 'Levier de financement', d: 'Les trous identifiés deviennent des dossiers de financement.' },
                ].map((u, i) => (
                  <div key={u.t} className="flex items-start gap-3">
                    <span className="font-mono mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-copper/30 text-[0.62rem] text-copper-bright">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-display text-sm font-semibold text-ink">{u.t}</div>
                      <div className="text-[0.84rem] leading-snug text-muted">{u.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-hair bg-river/30 px-4 py-3.5">
                <p className="text-[0.82rem] leading-relaxed text-muted">
                  <span className="text-copper-bright">Base légale.</span> La Charte des PME et de l’Artisanat
                  (RDC, 2009) prévoit un « Observatoire des PME » jamais opérationnalisé. La CCNE peut être
                  l’acteur qui le fait enfin exister.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
