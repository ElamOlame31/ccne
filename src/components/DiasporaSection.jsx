import { Reveal, SectionHead, SpotlightCard, Chip } from './ui.jsx'
import { DIASPORA, SECTOR_COLOR } from '../data/observatory.js'

export default function DiasporaSection() {
  return (
    <section id="diaspora" className="mx-auto mt-32 max-w-7xl scroll-mt-24 px-6">
      <SectionHead
        eyebrow="Lecture diaspora"
        title="Le réseau congolais, vu depuis l’extérieur"
        lead="La diaspora est un capital stratégique. L’Observatoire relie ses pôles — compétences, capital, réseaux — aux provinces et aux écarts identifiés, pour transformer l’attachement en investissement."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DIASPORA.map((d, i) => (
          <Reveal key={d.pole} delay={0.06 * i}>
            <SpotlightCard className="border-glow glass card-sheen group flex h-full flex-col overflow-hidden rounded-3xl border border-hair p-5 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{d.flag}</span>
                <span className="font-mono rounded-full border border-sky/25 bg-sky/8 px-2.5 py-1 text-[0.58rem] tracking-wide text-sky-bright">
                  {d.weight}
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold leading-tight text-ink">{d.pole}</h3>

              <div className="mt-4">
                <div className="font-mono text-[0.58rem] uppercase tracking-wider text-faint">Secteurs d’intérêt</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {d.sectors.map((s) => (
                    <Chip key={s} label={s} color={SECTOR_COLOR[s] || '#5fb3d4'} />
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-5">
                <div className="font-mono flex items-center gap-1.5 text-[0.58rem] uppercase tracking-wider text-sky-bright">
                  <span className="h-px w-4 bg-sky/50" /> Connexion suggérée
                </div>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">{d.connexion}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
