import { motion } from 'framer-motion'
import { GEO, GEO_VIEWBOX } from '../data/geo.js'
import { layerStyle } from '../data/observatory.js'

// Carte géographique réelle des 26 provinces de la RDC.
// `byName` : map nom → données province. Couleur pilotée par la couche active.
export default function DrcMap({ byName, layer, hovered, selected, query, onHover, onSelect, onTip }) {
  const q = query.trim().toLowerCase()

  return (
    <svg
      viewBox={GEO_VIEWBOX}
      className="h-full w-full"
      role="img"
      aria-label="Carte des 26 provinces de la République Démocratique du Congo"
      onMouseLeave={() => {
        onHover(null)
        onTip((t) => ({ ...t, show: false }))
      }}
    >
      <defs>
        <filter id="prov-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="sea" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0a201b" />
          <stop offset="100%" stopColor="#06120f" />
        </radialGradient>
      </defs>

      {/* halo de fond */}
      <rect x="-200" y="-200" width="1500" height="1500" fill="url(#sea)" opacity="0.5" />

      <g>
        {GEO.map((g, i) => {
          const p = byName[g.name]
          if (!p) return null
          const st = layerStyle(p, layer)
          const isHover = hovered === g.name
          const isSel = selected?.name === g.name
          const emphasize = isHover || isSel
          const match = !q || g.name.toLowerCase().includes(q)
          const dim = q && !match

          return (
            <motion.path
              key={g.name}
              d={g.path}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.01 * i }}
              fill={st.fill}
              stroke={emphasize ? '#fbe6c8' : 'rgba(4,12,10,0.85)'}
              strokeWidth={emphasize ? 2.6 : 1}
              strokeLinejoin="round"
              style={{
                cursor: 'pointer',
                opacity: dim ? 0.25 : 1,
                filter: emphasize ? 'url(#prov-glow) brightness(1.12)' : 'none',
                transition: 'fill .5s ease, opacity .35s ease, stroke .2s ease, stroke-width .2s ease',
              }}
              onMouseEnter={() => {
                onHover(g.name)
                onTip((t) => ({ ...t, show: true }))
              }}
              onClick={() => onSelect(p)}
            />
          )
        })}

        {/* étiquettes (abréviations) */}
        {GEO.map((g) => {
          const p = byName[g.name]
          if (!p) return null
          const isActive = hovered === g.name || selected?.name === g.name
          const st = layerStyle(p, layer)
          return (
            <text
              key={`t-${g.name}`}
              x={g.cx}
              y={g.cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-mono"
              style={{
                fontSize: isActive ? 17 : 13,
                fontWeight: 600,
                fill: st.intensity > 0.5 ? '#08130f' : '#dcebe3',
                paintOrder: 'stroke',
                stroke: st.intensity > 0.5 ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.55)',
                strokeWidth: 2.4,
                pointerEvents: 'none',
                letterSpacing: '0.02em',
                transition: 'font-size .2s ease',
              }}
            >
              {p.ab}
            </text>
          )
        })}
      </g>
    </svg>
  )
}
