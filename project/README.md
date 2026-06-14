# OGILVIE. Design System

> Les grands espaces — Mont-Blanc
> `-74.394739, 46.096005`

OGILVIE. is a **residential land development** brand operating in the Mont-Blanc region of Québec's Laurentian mountains. The brand sells **serviced plots of land** ("développement résidentiel de terrains") — the idea buyers buy into is not a house, but a piece of the landscape itself: forest, patinated sand soil, corten-red rock, sage hills, sunlit grasses.

The visual language is restrained, typographic, and photographic. It reads as editorial — closer to the masthead of an architecture journal than a typical real-estate brand. Earth tones. A single full-bleed photograph per surface. Black hairlines. An uppercase sans wordmark sealed with a period: **OGILVIE.**

---

## Sources

- `uploads/OGILVIE._Guide normes graphiques.pdf` — brand norms guide, v01, October 2025. Full source of the palette, typography spec, logo variants, and signature lockup. 6 pages. Extracted text in-project; rendered pages in `pdf_images/`.
- No codebase, Figma file, or live product was provided. The UI kit and slides in this system are therefore **extrapolations** from the brand norms: they apply the palette, type, and tone consistently, but are not recreations of existing screens. Flag this to the user if they expect pixel-fidelity to an existing property.

---

## Index

```
README.md                       ← you are here
SKILL.md                        ← Agent-Skills–compatible entry point
colors_and_type.css             ← CSS variables: palette, type scale, spacing, motion
fonts/                          ← (intentionally empty — fonts loaded via Google Fonts CDN)
assets/
  hero-landscape.jpg            ← sepia Laurentian landscape (from guide p.1)
  landscape-signature.jpg       ← same landscape, re-used on the signature lockup page
  logo-ogilvie-plain.png        ← primary wordmark (brand-provided PNG)
  logo-ogilvie-signature.png    ← wordmark + "LES GRANDS ESPACES — MONT-BLANC" (brand-provided)
  logo-ogilvie.svg              ← SVG fallback (Gloock-rendered)
  logo-ogilvie-reversed.svg     ← SVG fallback reversed
  logo-ogilvie-signature.svg    ← SVG fallback signature
preview/                        ← small HTML cards for the Design System tab
ui_kits/
  marketing-site/               ← the only "product" inferred — a marketing/landing site
    index.html                  ← interactive click-thru of the site
    *.jsx                       ← modular components
```

---

## CONTENT FUNDAMENTALS

**Language.** Primary language is **French** (Québécois). English captions appear only in technical or coordinate contexts. Copy is terse, declarative, and landscape-forward — the reader is being addressed as someone who already values the outdoors, not sold to.

**Tone.** Editorial, grounded, unhurried. No exclamation marks. No marketing puffery. Close to the voice of a well-made architecture monograph or a topographic field guide. Real-estate clichés ("dream home", "luxury living") are avoided; the land does the talking.

**Casing.**
- Wordmark and section headers: **UPPERCASE** (`OGILVIE.`, `LOGO`, `TYPOGRAPHIE PRINCIPALE`).
- Body copy: sentence case.
- Labels and eyebrows: `TRACKED UPPERCASE` (letter-spacing ~0.18em).

**Pronouns.** Neutral / implied. The brand rarely uses "vous" or "nous" — it prefers the land as subject. Example: *"Les grands espaces"* not *"Votre grand espace"*.

**The period.** The wordmark is always sealed with a period: **OGILVIE.** Treat this as part of the name, never dropped.

**Coordinates as signature.** `-74.394739, 46.096005` is used as a typographic flourish — pair with the wordmark on title surfaces. Think of it as the brand's latitude-longitude watermark.

**Emoji, unicode, emphatic punctuation.** **None.** No emoji. No "→", no "✦". A vertical bar `|` is used once in the signature lockup as a divider (`LES GRANDS ESPACES | MONT-BLANC`). That is the full extent of ornamental punctuation.

**Examples (lifted / extrapolated from the guide).**
- `OGILVIE.` — the wordmark, standalone.
- `LES GRANDS ESPACES | MONT-BLANC` — signature tagline.
- `DÉVELOPPEMENT RÉSIDENTIEL DE TERRAINS` — descriptor line.
- `GUIDE DE NORMES GRAPHIQUES` — document title styling.
- `VERSION 01_OCTOBRE 2025` — versioning style (underscore between label and value).

---

## VISUAL FOUNDATIONS

**Palette.** Five tokens, all earth-drawn. The guide names them in French — we keep the names in variables so they carry meaning.

| Token | Hex | Role |
|---|---|---|
| `--charbon-profond` | `#000000` | Primary ink. Wordmark, hairlines, section headers. |
| `--sable-patine` | `#D5C5A4` | Warm neutral canvas. The "paper" of the brand. |
| `--corten` | `#9B6B43` | Earthy rust accent. Buttons, highlights, seals. |
| `--sauge-collines` | `#8C8A73` | Muted sage. Tertiary copy, metadata, secondary panels. |
| `--gris-forestier` | `#575146` | Deep bark. Secondary ink and dark surfaces. |

A note on the source: the norms PDF labels `GRIS FORESTIER` with hex `#D5C5A4` but RGB `87, 81, 70`. The RGB is the true value; the hex appears to be a copy-paste error from Sable. We use `#575146` — the RGB-correct value.

**Type.** Two systems, pulled directly from the norms.
- **Primary display** — **Gloock Regular** (the face the guide labels "Glook ALL CAPS"). Served locally from `fonts/Gloock-Regular.ttf`. Used for the wordmark, hero titles, section headers. Upper OR lowercase both work; the brand sets it UPPERCASE for display.
- **Primary text** — **DM Sans** (variable, roman + italic). Served locally from `fonts/DMSans-VariableFont_opsz_wght.ttf` and `fonts/DMSans-Italic-VariableFont_opsz_wght.ttf`. Used for body, eyebrows, labels, buttons.
- **Alternative** — Ibarra Real Nova *Italic* + Playfair Display *Italic* (Google Fonts). Always italic, used sparingly for editorial pulls and ornamental language.
- Note: the guide also lists "Codec Pro Regular" alongside the others as a primary. No file was supplied; it's not used in the live system. If the brand owner provides Codec Pro, register it via `@font-face` and decide where it should carry load (likely alongside DM Sans).

**Spacing.** 8pt grid, with 4pt for type micro-adjustments. Generous whitespace — large surfaces are expected to breathe with 96–128px of air between sections.

**Backgrounds.**
- **Paper** (`#FDFBF6`) for reading surfaces.
- **Sable** for warm marketing canvases.
- **Charbon** for full-bleed dark hero moments with an image behind.
- **One full-bleed photograph per hero section** — sepia-toned, sun-flared, low-contrast. Never stock-feeling. Always Laurentian landscape: grass, forest, lake, sky.
- No gradients. No repeating patterns. No textures layered on UI chrome.

**Animation.** Minimal. Opacity fade-in on entry (`--dur-base` 260ms, `--ease-out`). No bounces, no spring physics, no parallax scroll gimmicks. Hover states animate over 160ms.

**Hover states.** Links: opacity drops to 0.6 with an underline already present. Buttons on sand/paper: darken by ~10% (`--corten-shade-10`). Buttons on dark: lighten toward sand. No scale transforms on hover.

**Press states.** Color deepens; no scale. A 1px inset shadow (`--shadow-inset`) confirms press on cards.

**Borders.** Hairlines — 1px, either `--charbon-profond` (full-weight structural rules) or `rgba(87,81,70,0.18)` (soft dividers). Never thicker than 1px in body chrome.

**Shadows.** Restrained and paper-like. `--shadow-card` lifts softly; `--shadow-float` for menus/modals. Inner shadow only on pressed / selected states. Never used as a decorative glow.

**Gradients vs. capsules.** No gradients in chrome. Photographs can carry natural vignetting. Buttons use **solid fills** — never gradient. Pills (`--radius-pill`) are used only for tags and status chips; primary buttons are rectangular (`--radius-md`).

**Layout rules.**
- Fixed top bar is thin (56–64px), sand or paper, with a single bottom hairline.
- Content columns max out at ~720px for reading, ~1280px for marketing.
- Section dividers are full-bleed 1px rules in charbon.
- Left-align is the default. Centered headlines appear on title / hero surfaces only.

**Transparency / blur.** Not used as chrome. If an overlay is needed over imagery, use a solid `--charbon-profond` at 40–60% opacity, never a backdrop-blur.

**Imagery color vibe.** **Warm, sepia, grainy.** Sun flares welcome. Slightly desaturated. Never cool blue. Never black-and-white. The one reference image in the guide is a sunlit grassland with distant lake and ridge — sand, sage, forest gray rendered literally.

**Corner radii.** Square-leaning. `--radius-md` (4px) for buttons and small cards. `--radius-lg` (8px) for larger cards. Nothing ever goes beyond `--radius-lg` except pills.

**Cards.** Sand-tint background, 1px soft border, 4–8px radius, `--shadow-card` only on elevation. No colored left-border accents. No glassmorphism.

---

## ICONOGRAPHY

The brand guide does **not** define an icon system. Given the brand's restraint, we prescribe the following for any interface work under OGILVIE:

- **Primary icon set:** [Lucide](https://lucide.dev) at `stroke-width: 1.25` — lighter than Lucide's default (1.5 → 1.25) to sit correctly next to the fine-weight wordmark and body copy. Loaded via CDN (`https://unpkg.com/lucide-static@latest`).
- **Usage density:** sparse. Icons appear only where they aid scanning (nav, form affordances, map markers). Never as bullet decoration. Never inside body paragraphs.
- **Stroke / fill:** stroke-only. No filled icons.
- **Color:** `--fg-1` by default; `--corten` for interactive / active states; `--fg-3` for disabled.
- **Size grid:** 16 / 20 / 24 px. The 20px size is the default in nav.
- **Emoji:** never.
- **Unicode characters as icons:** never, with one exception: the vertical bar `|` is the brand-approved divider in signature lockups.
- **Map / coordinate mark:** when coordinates appear, they are typographic, not iconographic — no pin symbol, just monospace digits.

This is a **substitution** for a missing brand-native icon set; we flag it. If the brand eventually defines one, replace the Lucide references with the brand set and update this section.

---

## See also

- `colors_and_type.css` — tokens to import into any HTML file.
- `preview/*.html` — the small specimen cards rendered in the Design System tab.
- `ui_kits/marketing-site/` — a click-thru marketing site using the above.
- `SKILL.md` — instructions for running this as an Agent Skill.
