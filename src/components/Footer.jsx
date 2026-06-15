import { Reveal, Magnetic } from './ui.jsx'

export default function Footer() {
  return (
    <footer className="mx-auto mt-32 max-w-7xl px-6 pb-14">
      {/* Bloc CTA */}
      <Reveal>
        <div className="border-glow glass-strong card-sheen relative overflow-hidden rounded-[32px] border border-hair px-8 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 rounded-full bg-copper/15 blur-[100px]" />
          <span className="eyebrow">Pour la CCNE</span>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Faire enfin exister l’Observatoire <span className="text-gradient-copper">que la RDC attend depuis 2009</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted">
            Un instrument permanent, porté par le réseau existant de la CCNE, qui transforme la donnée en
            plaidoyer, en partenariats et en financements.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic
              href="#carte"
              className="font-display inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-copper to-gold px-6 py-3 text-sm font-semibold text-abyss shadow-lg shadow-copper/20"
            >
              Revoir la carte
            </Magnetic>
            <Magnetic
              href="#top"
              strength={0.2}
              className="font-display inline-flex items-center gap-2 rounded-full border border-hair px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-copper/50 hover:text-copper-bright"
            >
              Retour en haut ↑
            </Magnetic>
          </div>
        </div>
      </Reveal>

      {/* pied */}
      <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg border border-copper/40 bg-river">
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <polygon points="12,3 19,7.5 19,16.5 12,21 5,16.5 5,7.5" fill="none" stroke="#f0a868" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="2.4" fill="#e8b84b" />
              </svg>
            </div>
            <div className="font-display text-sm font-semibold text-ink">Observatoire de l’Écosystème Entrepreneurial Congolais</div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Un instrument permanent porté par la CCNE — Chambre de Commerce Nationale et de l’Économie de la
            République Démocratique du Congo.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.72rem] uppercase tracking-wider text-muted">
          <a href="#carte" className="transition-colors hover:text-copper-bright">Carte</a>
          <a href="#trous" className="transition-colors hover:text-copper-bright">Trous</a>
          <a href="#diaspora" className="transition-colors hover:text-copper-bright">Diaspora</a>
          <a href="#partenariats" className="transition-colors hover:text-copper-bright">Partenariats</a>
          <a href="#rapport" className="transition-colors hover:text-copper-bright">Rapport</a>
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-hair pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5 rounded-2xl border border-gold/20 bg-gold/5 px-3.5 py-2.5">
          <span className="mt-0.5 text-gold">⚠</span>
          <p className="text-[0.78rem] leading-relaxed text-muted">
            <span className="text-gold-bright">Maquette de démonstration.</span> Toutes les données (PME, indices,
            scores, partenariats) sont <span className="text-ink">illustratives et fictives</span>, destinées à
            montrer le potentiel de l’outil. Aucune donnée réelle n’est représentée. Frontières provinciales :
            geoBoundaries (open data).
          </p>
        </div>
        <div className="font-mono shrink-0 text-[0.66rem] text-faint">© 2026 CCNE · Édition pilote</div>
      </div>
    </footer>
  )
}
