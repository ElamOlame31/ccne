// Convertit le GeoJSON des 26 provinces de la RDC en tracés SVG compacts.
// Lancé une fois (npm run geo) → écrit src/data/geo.js. Pas de dépendance au runtime.
import fs from 'node:fs'
import { geoMercator, geoPath } from 'd3-geo'
import rewind from '@mapbox/geojson-rewind'

const W = 1000
const H = 1000

// shapeName (geoBoundaries) → nom canonique utilisé dans observatory.js
const NAME_MAP = {
  'Central Kasai': 'Kasaï-Central',
  'Haut-Katanga': 'Haut-Katanga',
  'Haut-Lomami': 'Haut-Lomami',
  Ituri: 'Ituri',
  Kasai: 'Kasaï',
  'Kasai-Oriental': 'Kasaï-Oriental',
  Kinshasa: 'Kinshasa',
  'Kongo-Central': 'Kongo-Central',
  Kwango: 'Kwango',
  Kwilu: 'Kwilu',
  Lomami: 'Lomami',
  'Lower Uele': 'Bas-Uele',
  Lualaba: 'Lualaba',
  'Mai-Ndombe': 'Mai-Ndombe',
  Maniema: 'Maniema',
  Mongala: 'Mongala',
  'Nord-Ubangi': 'Nord-Ubangi',
  'North Kivu': 'Nord-Kivu',
  Sankuru: 'Sankuru',
  'South Kivu': 'Sud-Kivu',
  'Sud-Ubangi': 'Sud-Ubangi',
  Tanganyika: 'Tanganyika',
  Tshopo: 'Tshopo',
  Tshuapa: 'Tshuapa',
  'Upper Uele': 'Haut-Uele',
  Équateur: 'Équateur',
}

// Rewind en sens horaire : convention d'enroulement attendue par d3-geo (sphérique).
// Sans cela, d3 interprète chaque province comme « le reste du monde » et remplit tout.
const gj = rewind(JSON.parse(fs.readFileSync('drc_adm1.geojson', 'utf8')), true)

const projection = geoMercator().fitSize([W, H], gj)
const path = geoPath(projection)

// Compacte un tracé SVG : arrondit à l'entier et supprime les points consécutifs
// identiques (le GeoJSON simplifié contient beaucoup de doublons à cette échelle).
function compact(d) {
  // découpe en commandes (M/L/Z) avec leurs coordonnées
  const tokens = d.match(/[MLZ][^MLZ]*/g) || []
  let out = ''
  let lastX = null
  let lastY = null
  for (const t of tokens) {
    const cmd = t[0]
    if (cmd === 'Z') {
      out += 'Z'
      lastX = lastY = null
      continue
    }
    const pts = t
      .slice(1)
      .trim()
      .split('L')
      .map((p) => p.trim())
      .filter(Boolean)
    let first = true
    for (const p of pts) {
      const [xs, ys] = p.split(',')
      const x = Math.round(+xs)
      const y = Math.round(+ys)
      if (x === lastX && y === lastY) continue
      if (cmd === 'M' && first) {
        out += `M${x},${y}`
      } else {
        out += `L${x},${y}`
      }
      lastX = x
      lastY = y
      first = false
    }
  }
  return out
}

const provinces = gj.features.map((f) => {
  const name = NAME_MAP[f.properties.shapeName] || f.properties.shapeName
  const [cx, cy] = path.centroid(f)
  return {
    name,
    path: compact(path(f)),
    cx: Math.round(cx),
    cy: Math.round(cy),
  }
})

// viewBox serré sur l'ensemble
const [[x0, y0], [x1, y1]] = path.bounds(gj)
const pad = 12
const viewBox = `${(x0 - pad).toFixed(1)} ${(y0 - pad).toFixed(1)} ${(x1 - x0 + pad * 2).toFixed(1)} ${(y1 - y0 + pad * 2).toFixed(1)}`

const out = `// GÉNÉRÉ — ne pas éditer à la main. Source : geoBoundaries gbOpen COD ADM1.
// Régénérer : npm run geo
export const GEO_VIEWBOX = '${viewBox}'

export const GEO = ${JSON.stringify(provinces)}
`

fs.writeFileSync('src/data/geo.js', out)
const kb = (fs.statSync('src/data/geo.js').size / 1024).toFixed(0)
console.log(`✓ src/data/geo.js — ${provinces.length} provinces, ${kb} KB`)
console.log('viewBox:', viewBox)
