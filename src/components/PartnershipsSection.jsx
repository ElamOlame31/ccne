import { Reveal, SectionHead } from './ui.jsx'
import { PARTNERSHIPS, SECTOR_COLOR } from '../data/observatory.js'

export default function PartnershipsSection() {
  return (
    <section id="partenariats" className="mx-auto mt-32 max-w-7xl scroll-mt-24 px-6">
      <SectionHead
        eyebrow="Réseau actif · CCNE"
        title="Les partenariats déjà en place"
        lead="Le socle existe. L’Observatoire le rend lisible — chaque partenariat ancré dans une province et un secteur, prêt à être étendu, répliqué ou connecté à la diaspora."
      />

      <Reveal delay={0.1}>
        <div className="border-glow glass card-sheen mt-10 overflow-hidden rounded-3xl border border-hair">
          <div className="hidden grid-cols-[2.4fr_1.2fr_1.6fr_0.8fr] gap-4 border-b border-hair px-6 py-3.5 font-mono text-[0.62rem] uppercase tracking-wider text-faint sm:grid">
            <span>Partenariat</span>
            <span>Province</span>
            <span>Secteur</span>
            <span className="text-right">Statut</span>
          </div>

          <div>
            {PARTNERSHIPS.map((p, i) => {
              const color = SECTOR_COLOR[p.secteur] || '#9bb3aa'
              return (
                <Reveal key={p.name} delay={0.03 * i}>
                  <div className="grid grid-cols-1 gap-2 border-b border-hair/60 px-6 py-4 transition-colors last:border-0 hover:bg-white/[0.025] sm:grid-cols-[2.4fr_1.2fr_1.6fr_0.8fr] sm:items-center sm:gap-4">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-1 rounded-full" style={{ background: color }} />
                      <span className="font-display text-[0.96rem] font-semibold text-ink">{p.name}</span>
                    </div>
                    <div className="text-sm text-muted">
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-faint sm:hidden">Province · </span>
                      {p.province}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                      {p.secteur}
                    </div>
                    <div className="sm:text-right">
                      <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/8 px-2.5 py-1 text-[0.62rem] tracking-wide text-emerald">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                        {p.statut}
                      </span>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
