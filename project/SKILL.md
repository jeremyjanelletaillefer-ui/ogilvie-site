---
name: ogilvie-design
description: Use this skill to generate well-branded interfaces and assets for OGILVIE., a Québec residential land-development brand for the Mont-Blanc area of the Laurentians. Contains the brand's earth-tone palette, typography system (Archivo / DM Sans / Ibarra Real Nova italic / Playfair Display italic), logos, imagery, UI components, and a marketing-site UI kit — usable for production code or for throwaway prototypes / mocks / slides.
user-invocable: true
---

Read `README.md` in this skill for the full brand context — palette, typography, content voice (French, editorial, no emoji), visual foundations (sepia imagery, black hairlines, square-leaning radii), and iconography guidance.

Key files:

- `colors_and_type.css` — drop-in tokens: palette (`--charbon-profond`, `--sable-patine`, `--corten`, `--sauge-collines`, `--gris-forestier`), type scale, spacing, radii, motion. Loads Google Fonts via `@import`.
- `assets/` — logos (primary / reversed / signature lockup), hero landscape photo.
- `preview/` — small specimen cards (palette, type, components) — useful to quote styles from.
- `ui_kits/marketing-site/` — click-thru marketing site with modular JSX components (`TopBar`, `Hero`, `ParcelGrid`, `MapSection`, `ParcelDetail`, `ContactSheet`, etc).

When asked to make something:
- **Throwaway prototypes / mocks / slides:** copy the needed assets out, import `colors_and_type.css`, and assemble a single static HTML file. Use the UI-kit components as a reference — lift patterns, don't reimport them wholesale.
- **Production code:** copy the tokens and component patterns; the brand's restraint matters more than any single component. Favor the palette, the uppercase wordmark with its period, black hairlines, sepia imagery, and the French editorial voice.

If the user invokes this skill with no further guidance, ask them what they want to build (landing page? listing detail? pitch deck? brochure?), ask 3–5 focused questions about audience and length, then act as an expert designer delivering HTML artifacts or production code.

Substitutions to be aware of — flag if the user expects the real thing:
- **Gloock** (the display face) and **DM Sans** (variable) are served from real TTFs in `fonts/`.
- **Codec Pro** (listed in the norms but no file supplied) is not installed. Where the guide pairs Codec Pro with DM Sans for text, we use DM Sans alone.
- **Iconography** is not defined by the brand guide. Default to **Lucide** at `stroke-width: 1.25` — never emoji, never unicode glyphs (with the single exception of the `|` bar used in the signature lockup).

Never invent new primary colors, new gradient chrome, new emoji, or decorative SVGs. The brand's voice is quiet — match it.
