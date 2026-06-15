import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, SectionHead, Chip } from './ui.jsx'
import DrcMap from './DrcMap.jsx'
import {
  PROVINCES,
  LAYERS,
  SECTOR_COLOR,
  MAX_PME,
  layerStyle,
} from '../data/observatory.js'

const LAYER_ORDER = ['pme', 'partnerships', 'gaps', 'diaspora']

// Valeur numérique d'une province pour la couche active (classement)
function metric(p, layer) {
  switch (layer) {
    case 'pme': return { v: p.pme, max: MAX_PME, fmt: `${p.pme.toLocaleString('fr-FR')}`, unit: 'PME' }
    case 'diaspora': return { v: p.diaspora, max: 100, fmt: `${p.diaspora}`, unit: '/100' }
    case 'partnerships': return { v: p.partnerships.length, max: 2, fmt: `${p.partnerships.length}`, unit: 'part.' }
    case 'gaps': return { v: p.gap ? 1 : 0, max: 1, fmt: p.gap ? 'Écart' : '—', unit: '' }
    default: return { v: 0, max: 1, fmt: '', unit: '' }
  }
}

export default function MapExplorer() {
  const [layer, setLayer] = useState('pme')
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [tip, setTip] = useState({ x: 0, y: 0, show: false })

  const byName = useMemo(() => Object.fromEntries(PROVINCES.map((p) => [p.name, p])), [])
  const L = LAYERS[layer]

  const ranking = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...PROVINCES]
      .filter((p) => (layer === 'gaps' ? p.gap : layer === 'partnerships' ? p.partnerships.length > 0 : true))
      .filter((p) => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => metric(b, layer).v - metric(a, layer).v)
      .slice(0, 7)
  }, [layer, query])

  const hoveredP = hovered ? byName[hovered] : null

  return (
    <section id="carte" className="relative mx-auto mt-32 max-w-7xl scroll-mt-24 px-6">
      <SectionHead
        eyebrow="Carte interactive · 26 provinces réelles"
        title="La RDC, province par province"
        lead="Quatre lectures de l’écosystème sur la carte réelle du pays. Survolez une province pour sa valeur, cliquez pour ouvrir son dossier complet."
      />

      {/* contrôles */}
      <Reveal delay={0.08}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* segmented control */}
          <div className="glass inline-flex flex-wrap gap-1 rounded-2xl border border-hair p-1">
            {LAYER_ORDER.map((id) => {
              const active = layer === id
              return (
                <button
                  key={id}
                  onClick={() => setLayer(id)}
                  className="relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors"
                  style={{ color: active ? '#06130f' : '#cfe0d8' }}
                  aria-pressed={active}
                >
                  {active && (
                    <motion.span
                      layoutId="layer-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: LAYERS[id].accent }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: active ? '#06130f' : LAYERS[id].accent }} />
                    {LAYERS[id].label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* recherche */}
          <div className="glass flex items-center gap-2 rounded-2xl border border-hair px-3.5 py-2.5">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-faint" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une province…"
              className="w-44 bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-faint hover:text-ink" aria-label="Effacer">✕</button>
            )}
          </div>
        </div>
      </Reveal>

      {/* corps : carte + panneau */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* CARTE */}
        <Reveal delay={0.12}>
          <div className="border-glow glass card-sheen relative overflow-hidden rounded-[28px] border border-hair">
            <div className="flex items-center justify-between border-b border-hair px-5 py-3">
              <div className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                République Démocratique du Congo
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.66rem] tracking-wide" style={{ color: L.accent }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: L.accent }} />
                {L.label}
              </div>
            </div>

            <div
              className="relative aspect-[1/0.92] w-full"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                setTip((t) => ({ ...t, x: e.clientX - r.left, y: e.clientY - r.top }))
              }}
            >
              <DrcMap
                byName={byName}
                layer={layer}
                hovered={hovered}
                selected={selected}
                query={query}
                onHover={setHovered}
                onSelect={setSelected}
                onTip={setTip}
              />

              {/* tooltip */}
              <AnimatePresence>
                {tip.show && hoveredP && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="glass-strong pointer-events-none absolute z-20 w-max max-w-[230px] -translate-x-1/2 -translate-y-[125%] rounded-2xl border border-hair px-4 py-3 shadow-2xl"
                    style={{ left: tip.x, top: tip.y }}
                  >
                    <div className="font-display text-sm font-semibold text-ink">{hoveredP.name}</div>
                    <div className="mt-1 flex items-center gap-1.5 font-mono text-[0.72rem]" style={{ color: L.accent }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: L.accent }} />
                      {layerStyle(hoveredP, layer).value}
                    </div>
                    <div className="mt-1 font-mono text-[0.62rem] text-faint">Cliquer pour le dossier →</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* légende */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hair px-5 py-3.5">
              <Legend layer={L} />
              <div className="font-mono text-[0.62rem] text-faint">{PROVINCES.length} provinces · données illustratives</div>
            </div>
          </div>
        </Reveal>

        {/* PANNEAU */}
        <Reveal delay={0.18}>
          <div className="border-glow glass card-sheen relative flex min-h-[460px] flex-col overflow-hidden rounded-[28px] border border-hair p-6 lg:h-full">
            <AnimatePresence mode="wait">
              {selected ? (
                <Detail key={selected.name} p={selected} onClose={() => setSelected(null)} />
              ) : (
                <Leaderboard
                  key={`lb-${layer}`}
                  layer={layer}
                  ranking={ranking}
                  onPick={setSelected}
                  onHover={setHovered}
                />
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Legend({ layer }) {
  const lg = layer.legend
  if (lg.type === 'binary') {
    return (
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-[5px]" style={{ background: lg.active }} />
          <span className="text-xs text-muted">{lg.activeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-[5px] border border-hair" style={{ background: '#13302a' }} />
          <span className="text-xs text-muted">{lg.inactiveLabel}</span>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted">{lg.lowLabel}</span>
      <span className="h-3 w-28 rounded-full sm:w-36" style={{ background: `linear-gradient(90deg, ${lg.from}, ${lg.to})` }} />
      <span className="text-xs text-muted">{lg.highLabel}</span>
    </div>
  )
}

function Leaderboard({ layer, ranking, onPick, onHover }) {
  const L = LAYERS[layer]
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col"
    >
      <div className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-faint">Classement · {L.short}</div>
      <h3 className="font-display mt-1 text-xl font-semibold text-ink">{L.label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{L.description}</p>

      <div className="mt-5 flex-1 space-y-1.5">
        {ranking.length === 0 && (
          <div className="grid h-full place-items-center text-center text-sm text-faint">Aucune province ne correspond.</div>
        )}
        {ranking.map((p, i) => {
          const m = metric(p, layer)
          const w = m.max ? Math.max(6, (m.v / m.max) * 100) : 6
          return (
            <button
              key={p.name}
              onMouseEnter={() => onHover(p.name)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onPick(p)}
              className="group relative w-full overflow-hidden rounded-xl border border-hair bg-river/30 px-3.5 py-2.5 text-left transition-colors hover:border-copper/40 hover:bg-river/60"
            >
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono w-5 text-[0.7rem] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-ink">{p.name}</span>
                </div>
                <span className="font-mono shrink-0 text-sm" style={{ color: L.accent }}>
                  {m.fmt}
                  <span className="ml-1 text-[0.62rem] text-faint">{m.unit}</span>
                </span>
              </div>
              <span
                className="absolute inset-y-0 left-0 z-0 rounded-xl opacity-15 transition-all group-hover:opacity-25"
                style={{ width: `${w}%`, background: L.accent }}
              />
            </button>
          )
        })}
      </div>

      <div className="mt-4 rounded-xl border border-hair bg-river/30 px-4 py-3">
        <p className="text-[0.78rem] leading-relaxed text-muted">
          <span className="text-copper-bright">Astuce.</span> Cliquez une province — sur la carte ou dans ce classement —
          pour ouvrir son dossier détaillé.
        </p>
      </div>
    </motion.div>
  )
}

function Bar({ label, value, color }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted">{label}</span>
        <span className="font-mono text-sm font-semibold" style={{ color }}>
          {value}
          <span className="text-faint">/100</span>
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function Detail({ p, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-faint">Dossier provincial</div>
          <h3 className="font-display mt-1 text-2xl font-bold text-ink">{p.name}</h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="grid h-8 w-8 place-items-center rounded-full border border-hair text-muted transition-colors hover:border-copper/50 hover:text-copper-bright"
        >
          ✕
        </button>
      </div>

      {p.gap && (
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-gold/30 bg-gold/8 px-3.5 py-3">
          <span className="mt-0.5 text-gold">◆</span>
          <div>
            <div className="font-display text-sm font-semibold text-gold-bright">Écart stratégique prioritaire</div>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{p.gapNote}</p>
          </div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-hair bg-river/40 px-4 py-3.5">
          <div className="font-mono text-[0.6rem] uppercase tracking-wider text-faint">PME membres</div>
          <div className="font-display mt-1 text-2xl font-bold text-ink">{p.pme.toLocaleString('fr-FR')}</div>
        </div>
        <div className="rounded-2xl border border-hair bg-river/40 px-4 py-3.5">
          <div className="font-mono text-[0.6rem] uppercase tracking-wider text-faint">Partenariats</div>
          <div className="font-display mt-1 text-2xl font-bold text-ink">{p.partnerships.length}</div>
        </div>
      </div>

      <div className="mt-5">
        <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">Secteurs dominants</div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {p.sectors.map((s) => (
            <Chip key={s} label={s} color={SECTOR_COLOR[s] || '#9bb3aa'} />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <Bar label="Indice de dynamisme" value={p.dynamism} color="#f0a868" />
        <Bar label="Connexion diaspora" value={p.diaspora} color="#5fb3d4" />
      </div>

      {p.partnerships.length > 0 && (
        <div className="mt-6">
          <div className="font-mono text-[0.62rem] uppercase tracking-wider text-faint">Partenariats actifs</div>
          <div className="mt-2.5 space-y-2">
            {p.partnerships.map((pp) => (
              <div key={pp.name} className="flex items-center justify-between gap-3 rounded-xl border border-hair bg-river/40 px-3.5 py-2.5">
                <span className="text-sm text-ink">{pp.name}</span>
                <span className="font-mono rounded-full border border-copper/30 px-2 py-0.5 text-[0.6rem] text-copper-bright">Actif</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
