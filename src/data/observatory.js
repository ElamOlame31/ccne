// ────────────────────────────────────────────────────────────────────────────
// Observatoire de l'Écosystème Entrepreneurial Congolais — données ILLUSTRATIVES
// Toutes les valeurs sont mockées pour la démonstration. Aucune donnée réelle.
// ────────────────────────────────────────────────────────────────────────────

export const SECTORS = [
  'Agriculture & Agro-industrie',
  'Mines & Ressources',
  'Commerce & Distribution',
  'Technologie & Services numériques',
  'Artisanat & Mode',
  'Énergie',
  'Construction & BTP',
  'Transport & Logistique',
]

// Couleur d'identification par secteur (chips)
export const SECTOR_COLOR = {
  'Agriculture & Agro-industrie': '#6fae6a',
  'Mines & Ressources': '#c87f4a',
  'Commerce & Distribution': '#d8a64a',
  'Technologie & Services numériques': '#5fb3d4',
  'Artisanat & Mode': '#c77fb0',
  Énergie: '#e8b84b',
  'Construction & BTP': '#9a8d7a',
  'Transport & Logistique': '#7fa8b8',
}

// col / row : coordonnées de la grille hexagonale, disposées pour évoquer la
// silhouette de la RDC — large au nord/centre, façade atlantique à l'ouest,
// "queue" du Katanga vers le sud-est.
export const PROVINCES = [
  { name: 'Kinshasa', ab: 'KIN', col: 1.0, row: 4.0, pme: 4200, dynamism: 88, diaspora: 92,
    sectors: ['Commerce & Distribution', 'Technologie & Services numériques', 'Construction & BTP'],
    partnerships: [
      { name: 'Programme Diaspora Tech', secteur: 'Technologie & Services numériques' },
      { name: 'Forum Entrepreneurial Kinshasa', secteur: 'Commerce & Distribution' },
    ] },
  { name: 'Kongo-Central', ab: 'K-C', col: 0.0, row: 4.15, pme: 1450, dynamism: 74, diaspora: 68,
    sectors: ['Transport & Logistique', 'Énergie', 'Commerce & Distribution'],
    partnerships: [{ name: 'Corridor Logistique Atlantique', secteur: 'Transport & Logistique' }] },
  { name: 'Kwango', ab: 'KWA', col: 1.5, row: 5.0, pme: 180, dynamism: 38, diaspora: 34,
    sectors: ['Agriculture & Agro-industrie', 'Artisanat & Mode'], partnerships: [] },
  { name: 'Kwilu', ab: 'KWI', col: 2.3, row: 4.2, pme: 240, dynamism: 42, diaspora: 36,
    sectors: ['Agriculture & Agro-industrie', 'Commerce & Distribution'], partnerships: [] },
  { name: 'Mai-Ndombe', ab: 'MAI', col: 1.6, row: 3.05, pme: 120, dynamism: 31, diaspora: 28,
    sectors: ['Agriculture & Agro-industrie', 'Transport & Logistique'], partnerships: [] },
  { name: 'Kasaï', ab: 'KAS', col: 3.0, row: 4.0, pme: 210, dynamism: 40, diaspora: 44,
    sectors: ['Mines & Ressources', 'Artisanat & Mode'], partnerships: [],
    gap: true,
    gapNote:
      'Bassin diamantifère artisanal majeur, mais filière non structurée et sans accès export formel. Opportunité : programme de formalisation et d’accès aux marchés export.' },
  { name: 'Kasaï-Central', ab: 'KSC', col: 4.0, row: 4.0, pme: 260, dynamism: 43, diaspora: 41,
    sectors: ['Mines & Ressources', 'Agriculture & Agro-industrie', 'Artisanat & Mode'], partnerships: [] },
  { name: 'Kasaï-Oriental', ab: 'KSO', col: 5.0, row: 4.0, pme: 480, dynamism: 52, diaspora: 48,
    sectors: ['Mines & Ressources', 'Commerce & Distribution'], partnerships: [] },
  { name: 'Lomami', ab: 'LOM', col: 5.5, row: 4.6, pme: 160, dynamism: 34, diaspora: 26,
    sectors: ['Agriculture & Agro-industrie', 'Mines & Ressources'], partnerships: [] },
  { name: 'Sankuru', ab: 'SAN', col: 4.0, row: 3.0, pme: 110, dynamism: 29, diaspora: 24,
    sectors: ['Agriculture & Agro-industrie', 'Artisanat & Mode'], partnerships: [] },
  { name: 'Maniema', ab: 'MAN', col: 5.6, row: 3.0, pme: 140, dynamism: 33, diaspora: 30,
    sectors: ['Mines & Ressources', 'Énergie'], partnerships: [],
    gap: true,
    gapNote:
      'Province enclavée à fort potentiel minier et hydroélectrique, dépourvue d’infrastructure énergétique et numérique. Opportunité : partenariat énergie-connectivité ciblé.' },
  { name: 'Sud-Kivu', ab: 'S-K', col: 6.6, row: 3.0, pme: 1100, dynamism: 78, diaspora: 72,
    sectors: ['Agriculture & Agro-industrie', 'Mines & Ressources', 'Commerce & Distribution'],
    partnerships: [{ name: 'Initiative Agro-Export Kivu', secteur: 'Agriculture & Agro-industrie' }] },
  { name: 'Nord-Kivu', ab: 'N-K', col: 6.6, row: 2.0, pme: 1320, dynamism: 82, diaspora: 80,
    sectors: ['Technologie & Services numériques', 'Commerce & Distribution', 'Agriculture & Agro-industrie'],
    partnerships: [{ name: 'Hub Numérique Goma', secteur: 'Technologie & Services numériques' }] },
  { name: 'Ituri', ab: 'ITU', col: 6.6, row: 1.0, pme: 330, dynamism: 46, diaspora: 38,
    sectors: ['Mines & Ressources', 'Agriculture & Agro-industrie'], partnerships: [] },
  { name: 'Tshopo', ab: 'TSH', col: 4.6, row: 1.6, pme: 410, dynamism: 50, diaspora: 42,
    sectors: ['Transport & Logistique', 'Agriculture & Agro-industrie', 'Commerce & Distribution'], partnerships: [] },
  { name: 'Haut-Uele', ab: 'H-U', col: 6.0, row: 0.2, pme: 130, dynamism: 30, diaspora: 22,
    sectors: ['Mines & Ressources', 'Agriculture & Agro-industrie'], partnerships: [] },
  { name: 'Bas-Uele', ab: 'B-U', col: 5.0, row: 0.2, pme: 90, dynamism: 24, diaspora: 18,
    sectors: ['Agriculture & Agro-industrie'], partnerships: [] },
  { name: 'Nord-Ubangi', ab: 'N-U', col: 3.3, row: 0.4, pme: 100, dynamism: 27, diaspora: 25,
    sectors: ['Agriculture & Agro-industrie', 'Commerce & Distribution'], partnerships: [] },
  { name: 'Sud-Ubangi', ab: 'S-U', col: 2.4, row: 1.2, pme: 150, dynamism: 32, diaspora: 29,
    sectors: ['Agriculture & Agro-industrie', 'Commerce & Distribution'], partnerships: [] },
  { name: 'Mongala', ab: 'MON', col: 3.6, row: 1.3, pme: 120, dynamism: 28, diaspora: 23,
    sectors: ['Agriculture & Agro-industrie', 'Transport & Logistique'], partnerships: [] },
  { name: 'Équateur', ab: 'ÉQU', col: 2.4, row: 2.2, pme: 170, dynamism: 35, diaspora: 33,
    sectors: ['Agriculture & Agro-industrie', 'Transport & Logistique'], partnerships: [],
    gap: true,
    gapNote:
      'Potentiel agricole considérable, présence PME structurée quasi nulle, aucune unité de transformation locale. Opportunité : financement vert pour l’agro-transformation.' },
  { name: 'Tshuapa', ab: 'TSU', col: 3.4, row: 2.5, pme: 80, dynamism: 22, diaspora: 19,
    sectors: ['Agriculture & Agro-industrie'], partnerships: [] },
  { name: 'Tanganyika', ab: 'TAN', col: 6.6, row: 4.5, pme: 230, dynamism: 39, diaspora: 35,
    sectors: ['Transport & Logistique', 'Mines & Ressources'], partnerships: [],
    gap: true,
    gapNote:
      'Corridor lacustre du Tanganyika sous-exploité reliant le Katanga à l’Afrique de l’Est. Opportunité : partenariat corridor logistique transfrontalier.' },
  { name: 'Haut-Lomami', ab: 'H-L', col: 6.0, row: 5.5, pme: 200, dynamism: 37, diaspora: 31,
    sectors: ['Mines & Ressources', 'Agriculture & Agro-industrie'], partnerships: [] },
  { name: 'Lualaba', ab: 'LUA', col: 5.5, row: 6.5, pme: 960, dynamism: 80, diaspora: 64,
    sectors: ['Mines & Ressources', 'Énergie', 'Construction & BTP'],
    partnerships: [{ name: 'Corridor Cuivre-Cobalt', secteur: 'Mines & Ressources' }] },
  { name: 'Haut-Katanga', ab: 'H-K', col: 6.6, row: 6.5, pme: 1980, dynamism: 85, diaspora: 70,
    sectors: ['Mines & Ressources', 'Commerce & Distribution', 'Construction & BTP', 'Énergie'],
    partnerships: [{ name: "Centrale d'Achat — LA CASA Africa", secteur: 'Commerce & Distribution' }] },
]

// ── Indicateurs agrégés ────────────────────────────────────────────────────
export const TOTAL_PME = PROVINCES.reduce((s, p) => s + p.pme, 0)
export const TOTAL_PARTNERSHIPS = PROVINCES.reduce((s, p) => s + p.partnerships.length, 0)
export const TOTAL_PROVINCES = PROVINCES.length
export const TOTAL_SECTORS = SECTORS.length
export const TOTAL_GAPS = PROVINCES.filter((p) => p.gap).length
export const AVG_DYNAMISM = Math.round(
  PROVINCES.reduce((s, p) => s + p.dynamism, 0) / PROVINCES.length,
)
export const MAX_PME = Math.max(...PROVINCES.map((p) => p.pme))

// ── Définition des couches activables de la carte ──────────────────────────
export const LAYERS = {
  pme: {
    id: 'pme',
    label: 'Densité PME',
    short: 'Densité',
    accent: '#e09a5d',
    description: 'Nombre de PME membres cartographiées par province.',
    legend: { lowLabel: 'Faible densité', highLabel: 'Forte densité', from: '#15332d', to: '#e09a5d' },
  },
  partnerships: {
    id: 'partnerships',
    label: 'Partenariats',
    short: 'Partenariats',
    accent: '#c87f4a',
    description: 'Provinces où la CCNE dispose d’un partenariat actif.',
    legend: { type: 'binary', activeLabel: 'Partenariat actif', inactiveLabel: 'Aucun partenariat', active: '#c87f4a' },
  },
  gaps: {
    id: 'gaps',
    label: 'Trous & opportunités',
    short: 'Trous',
    accent: '#e8b84b',
    description: 'Provinces présentant un écart stratégique prioritaire.',
    legend: { type: 'binary', activeLabel: 'Écart prioritaire', inactiveLabel: 'Couverture nominale', active: '#e8b84b' },
  },
  diaspora: {
    id: 'diaspora',
    label: 'Connexion diaspora',
    short: 'Diaspora',
    accent: '#82cfe8',
    description: 'Score estimé de connexion à la diaspora congolaise.',
    legend: { lowLabel: 'Faible connexion', highLabel: 'Forte connexion', from: '#15332d', to: '#5fb3d4' },
  },
}

// ── Section 3 — Trous identifiés & opportunités ────────────────────────────
export const GAPS = [
  {
    zone: 'Équateur',
    sector: 'Agriculture & Agro-industrie',
    constat:
      'Potentiel agricole parmi les plus élevés du pays, mais densité de PME structurées quasi nulle et aucune unité de transformation locale recensée.',
    opportunite:
      'Mobiliser un financement vert (climat / agro-transformation) pour structurer une première grappe de PME agro-industrielles — argument de plaidoyer auprès des bailleurs verts.',
    levier: 'Financement vert',
  },
  {
    zone: 'Tanganyika',
    sector: 'Transport & Logistique',
    constat:
      'Le corridor lacustre du Tanganyika, porte naturelle vers l’Afrique de l’Est, reste sous-exploité et déconnecté des flux du Katanga.',
    opportunite:
      'Négocier un partenariat corridor logistique transfrontalier reliant Katanga ↔ Afrique de l’Est, en s’appuyant sur le réseau de la diaspora à Johannesburg.',
    levier: 'Accès export',
  },
  {
    zone: 'Grand Kasaï',
    sector: 'Artisanat & Mines',
    constat:
      'Bassin diamantifère artisanal historique, filière largement informelle, sans structuration ni accès aux marchés export formels.',
    opportunite:
      'Lancer un programme de formalisation et de certification artisanale, ouvrant l’accès aux marchés export et à la diaspora créative de Paris / Bruxelles.',
    levier: 'Formalisation & export',
  },
  {
    zone: 'Maniema',
    sector: 'Mines & Énergie',
    constat:
      'Province enclavée à fort potentiel minier et hydroélectrique, dépourvue d’infrastructure énergétique et de connectivité numérique.',
    opportunite:
      'Cibler un partenariat énergie-connectivité (mini-réseaux + fibre) attirant l’expertise diaspora de Houston / Washington dans l’énergie et l’ingénierie.',
    levier: 'Partenariat ciblé',
  },
]

// ── Section 4 — Lecture diaspora ───────────────────────────────────────────
export const DIASPORA = [
  {
    pole: 'Montréal / Ottawa',
    flag: '🇨🇦',
    weight: 'Pôle majeur',
    sectors: ['Technologie & Services numériques', 'Santé', 'Finance'],
    connexion: 'Programme Diaspora Tech (Kinshasa) · Hub Numérique de Goma (Nord-Kivu)',
  },
  {
    pole: 'Paris / Bruxelles',
    flag: '🇫🇷🇧🇪',
    weight: 'Pôle historique',
    sectors: ['Commerce & Distribution', 'Artisanat & Mode', 'Conseil'],
    connexion: 'Corridor Logistique Atlantique (Kongo-Central) · Filière artisanale du Grand Kasaï',
  },
  {
    pole: 'Houston / Washington',
    flag: '🇺🇸',
    weight: 'Pôle technique',
    sectors: ['Énergie', 'Mines & Ressources', 'Ingénierie'],
    connexion: 'Corridor Cuivre-Cobalt (Lualaba) · Écart énergie-connectivité du Maniema',
  },
  {
    pole: 'Johannesburg',
    flag: '🇿🇦',
    weight: 'Pôle régional',
    sectors: ['Mines & Ressources', 'Transport & Logistique', 'Agro-industrie'],
    connexion: 'Centrale d’Achat LA CASA Africa (Haut-Katanga) · Corridor du Tanganyika',
  },
]

// ── Section 5 — Partenariats actifs de la CCNE ─────────────────────────────
export const PARTNERSHIPS = [
  { name: "Centrale d'Achat — LA CASA Africa", province: 'Haut-Katanga', secteur: 'Commerce & Distribution', statut: 'Actif' },
  { name: 'Corridor Cuivre-Cobalt', province: 'Lualaba', secteur: 'Mines & Ressources', statut: 'Actif' },
  { name: 'Hub Numérique Goma', province: 'Nord-Kivu', secteur: 'Technologie & Services numériques', statut: 'Actif' },
  { name: 'Initiative Agro-Export Kivu', province: 'Sud-Kivu', secteur: 'Agriculture & Agro-industrie', statut: 'Actif' },
  { name: 'Corridor Logistique Atlantique', province: 'Kongo-Central', secteur: 'Transport & Logistique', statut: 'Actif' },
  { name: 'Programme Diaspora Tech', province: 'Kinshasa', secteur: 'Technologie & Services numériques', statut: 'Actif' },
  { name: 'Forum Entrepreneurial Kinshasa', province: 'Kinshasa', secteur: 'Commerce & Distribution', statut: 'Actif' },
]

// ── Helpers de couleur pour la carte ───────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
function mix(from, to, t) {
  const a = hexToRgb(from)
  const b = hexToRgb(to)
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * Math.max(0, Math.min(1, t))))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

// Renvoie { fill, intensity (0-1), value (texte tooltip) } pour une province + couche
export function layerStyle(prov, layerId) {
  switch (layerId) {
    case 'pme': {
      const t = Math.pow(prov.pme / MAX_PME, 0.55)
      return { fill: mix('#15332d', '#e09a5d', t), intensity: t, value: `${prov.pme.toLocaleString('fr-FR')} PME membres` }
    }
    case 'diaspora': {
      const t = prov.diaspora / 100
      return { fill: mix('#15332d', '#5fb3d4', t), intensity: t, value: `Connexion diaspora ${prov.diaspora}/100` }
    }
    case 'partnerships': {
      const active = prov.partnerships.length > 0
      return {
        fill: active ? '#c87f4a' : '#13302a',
        intensity: active ? 1 : 0.15,
        value: active ? `${prov.partnerships.length} partenariat${prov.partnerships.length > 1 ? 's' : ''} actif${prov.partnerships.length > 1 ? 's' : ''}` : 'Aucun partenariat',
      }
    }
    case 'gaps': {
      return {
        fill: prov.gap ? '#e8b84b' : '#13302a',
        intensity: prov.gap ? 1 : 0.15,
        value: prov.gap ? 'Écart stratégique prioritaire' : 'Couverture nominale',
      }
    }
    default:
      return { fill: '#13302a', intensity: 0.2, value: '' }
  }
}
