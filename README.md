# Observatoire de l'Écosystème Entrepreneurial Congolais — maquette CCNE

Maquette interactive (webapp à page unique) destinée à une rencontre avec le Président de la **CCNE-RDC**.
Elle démontre le potentiel d'un outil institutionnel permanent : **l'Observatoire de l'Écosystème
Entrepreneurial Congolais** (carte interactive + rapports trimestriels + diagnostic des « trous »).

> ⚠️ **Toutes les données sont illustratives et fictives.** Aucune donnée réelle n'est représentée.

## Stack

React 18 · Vite 6 · Tailwind CSS v4 · Framer Motion · carte SVG des frontières réelles
(projetées avec d3-geo à partir de geoBoundaries — open data).

## Lancer en local

```bash
npm install          # une seule fois
npm run dev          # mode développement (http://localhost:5173)
```

### Pour la démonstration en direct (build de production)

```bash
npm run build
npm run preview      # sert le build sur http://localhost:4173
```

## Contenu de la maquette

1. **En-tête** — titre, mission, barre de statistiques animées (PME, provinces, secteurs, partenariats).
2. **Carte interactive** des 26 provinces (grille hexagonale évoquant la silhouette de la RDC),
   4 couches activables : *Densité PME · Partenariats · Trous & opportunités · Connexion diaspora*,
   tooltip au survol, dossier provincial détaillé au clic, légende dynamique.
3. **Trous identifiés & opportunités** — 4 écarts stratégiques formulés comme arguments de plaidoyer.
4. **Lecture diaspora** — 4 pôles (Montréal/Ottawa, Paris/Bruxelles, Houston/Washington, Johannesburg).
5. **Partenariats actifs** de la CCNE.
6. **Aperçu du Rapport de l'Observatoire** — Édition 01 · T3 2026, cadence trimestrielle.
7. **Pied de page** — disclaimer maquette / données illustratives.

## Personnaliser les données

Tout est centralisé dans [`src/data/observatory.js`](src/data/observatory.js) :
provinces, secteurs, couches de la carte, trous, pôles diaspora, partenariats.

## Régénérer la carte (frontières)

Les tracés SVG compacts des 26 provinces vivent dans `src/data/geo.js` (généré).
Pour les régénérer depuis le GeoJSON source :

```bash
npm run geo          # node scripts/build-geo.mjs
```

> Note technique : geoBoundaries enroule les polygones dans le sens inverse de la
> convention sphérique de d3-geo ; le script applique un *rewind* horaire, sans quoi
> chaque province se projette comme « le reste du monde » et remplit toute la carte.
