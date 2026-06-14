# UI kit — OGILVIE marketing site

An interactive click-thru marketing site for OGILVIE., built from the brand norms guide alone (no existing codebase or Figma was provided — flag this to the user if pixel-fidelity to an existing site is expected).

## Routes

- **Accueil** — hero with Laurentian landscape, stats strip, manifesto, editorial pull, contact CTA.
- **Terrains** — grid of 6 parcels. Click a card to open the detail drawer.
- **Carte** — schematic map in charbon, with parcel pins and contour rings.
- **Histoire** — manifesto + editorial pull + contact.
- **Contact** — opens a modal from anywhere (top-right CTA, hero CTA, contact strip).

Route persists in `localStorage` under `ogilvie:route`.

## Components

| File | Exports |
|---|---|
| `Primitives.jsx` | `Wordmark`, `Eyebrow`, `Button`, `Rule`, `Tag`, `Coords` |
| `Chrome.jsx` | `TopBar`, `Footer` |
| `Hero.jsx` | `Hero`, `StatsStrip`, `Manifest` |
| `Sections.jsx` | `ParcelGrid`, `MapSection`, `EditorialCut`, `ContactStrip` |
| `Detail.jsx` | `ParcelDetail` (drawer), `ContactSheet` (modal) |

All components write themselves onto `window` so Babel-transpiled scripts can share them.

## Usage

Open `index.html`. No build step.
