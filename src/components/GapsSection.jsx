import { Reveal, SectionHead, SpotlightCard } from './ui.jsx'
import { GAPS } from '../data/observatory.js'

export default function GapsSection() {
  return (
    <section id="trous" className="mx-auto mt-32 max-w-7xl scroll-mt-24 px-6">
      <SectionHead
        eyebrow="Diagnostic · trous identifiés"
        title="Là où l’écosystème ne couvre pas encore"
        lead="L’Observatoire ne montre pas seulement ce qui existe : il révèle les écarts. Chaque trou devient un argument de plaidoyer concret — un financement ou un partenariat à aller chercher."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {GAPS.map((g, i) => (
          <Reveal key={g.zone} delay={0.06 * i}>
            <SpotlightCard className="border-glow glass card-sheen group relative h-full overflow-hidden rounded-3xl border border-hair p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold to-copper" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">
                    {String(i + 1).padStart(2, '0')} · {g.sector}
                  </div>
                  <h3 className="font-display mt-1.5 text-2xl font-bold text-ink">{g.zone}</h3>
                </div>
                <span className="font-mono shrink-0 rounded-full border border-gold/30 bg-gold/8 px-2.5 py-1 text-[0.62rem] tracking-wide text-gold-bright">
                  {g.levier}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="font-mono mb-1 text-[0.6rem] uppercase tracking-wider text-copper-bright">Constat</div>
                  <p className="text-[0.92rem] leading-relaxed text-muted">{g.constat}</p>
                </div>
                <div className="rounded-2xl border border-gold/15 bg-gold/[0.04] p-3.5">
                  <div className="font-mono mb-1 text-[0.6rem] uppercase tracking-wider text-gold-bright">Opportunité / plaidoyer</div>
                  <p className="text-[0.92rem] leading-relaxed text-ink/90">{g.opportunite}</p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
