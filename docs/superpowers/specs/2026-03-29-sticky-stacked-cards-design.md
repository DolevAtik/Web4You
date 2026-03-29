# Sticky Stacked Cards — Portfolio Section Redesign

**Date:** 2026-03-29
**File affected:** `src/components/sections/Portfolio.jsx`
**Data source:** `src/data/content.js` (unchanged)

---

## Overview

Replace the current Portfolio section (mobile carousel + desktop grid) with a unified **Sticky Stacked Cards** scrolling effect. Works on both mobile and desktop. 10 cards total (9 projects + 1 CTA).

---

## Architecture

Single component file: `src/components/sections/Portfolio.jsx`.

```
Portfolio (section)
├── Header (unchanged — sectionTitle + sectionSubtitle)
└── StackContainer (div, ref={containerRef})
    ├── StickyCard i=0  sticky top-[10vh] z-10
    ├── StickyCard i=1  sticky top-[10vh] z-20
    ├── ...
    ├── StickyCard i=8  sticky top-[10vh] z-90
    └── CTACard         sticky top-[10vh] z-[100]
```

### Sub-components

| Component | Role |
|---|---|
| `StickyCard` | Renders a single project card with scroll-driven scale/opacity |
| `CTACard` | Renders the "your project here" card — same sticky behaviour, no scale-down |
| `Portfolio` | Owns `containerRef`, passes `scrollYProgress` down |

---

## Scroll Animation Logic

```js
const { scrollYProgress } = useScroll({ target: containerRef })
```

For card at index `i` out of `N` total cards:

- **inputRange:** `[i / N, (i + 1) / N]`
- **scale:** `1 → 0.9` (the card shrinks as the next card slides over it)
- **opacity:** `1 → 0.6`

The last card (CTA, index N-1) receives no scale/opacity transform — it stays fully visible.

Each `StickyCard` receives its own `scale` and `opacity` `MotionValue` computed via `useTransform`.

---

## Card Layout

**Height:** `h-[80vh]`
**Border radius:** `rounded-[2rem]`
**Background:** `bg-slate-900/90 backdrop-blur-xl border border-white/10`
**Sticky:** `sticky top-[10vh]`

### Desktop (md+): two columns

```
┌──────────────────────────────────────────────┐
│  LEFT (flex-1)          │  RIGHT (flex-1)     │
│  padding: p-10          │  image object-cover │
│  tag badge              │  rounded-r-[2rem]   │
│  title (rajdhani bold)  │                     │
│  description (assistant)│                     │
│  visit link             │                     │
└──────────────────────────────────────────────┘
```

### Mobile: vertical stack

```
┌──────────────────┐
│  image (40% h)   │  ← rounded-t-[2rem]
│  tag badge overlay│
├──────────────────┤
│  title           │
│  description     │
│  visit link      │
└──────────────────┘
```

Image: `src={item.image}` with `object-cover object-top`.
Visit link: `<a href={item.url} target="_blank">` with `<ExternalLink />` icon.

---

## Glow / Accent Colors per Card

Each card gets a `accentColor` string (Tailwind color key) used for:
- `box-shadow` (glow effect via inline style or Tailwind `shadow-*`)
- Border color: `border-{color}-500/40`
- Tag badge background/text tint

| # | Project | accentColor |
|---|---|---|
| 0 | Liel Edri Baking | `amber` |
| 1 | After Taste | `rose` |
| 2 | Lital Kitchen | `emerald` |
| 3 | Tomer Portfolio | `blue` |
| 4 | Or Levy Finance | `violet` |
| 5 | איתי יצחקי | `orange` |
| 6 | DL Baloons | `pink` |
| 7 | MentConnect | `cyan` |
| 8 | עמית הדברות | `green` |
| 9 | CTA | `teal` (dashed border) |

Glow implementation: inline `style={{ boxShadow: '0 0 40px 0 {color}' }}` using a hardcoded color map (Tailwind doesn't support dynamic class names for arbitrary shadow colors).

---

## CTA Card

- Same `sticky top-[10vh] h-[80vh]` as project cards
- Style: `border-dashed border-teal-500/30`, gradient background `from-teal-500/[0.07] to-blue-500/[0.07]`
- Content: centered, rocket emoji animation (preserved from current), placeholder text + CTA link
- No scale-down animation

---

## Data

No changes to `src/data/content.js`. All data pulled from:
- `portfolio.items` — array of 9 projects
- `portfolio.cta` — `{ placeholder, label, href }`
- `portfolio.sectionTitle` / `portfolio.sectionSubtitle`

---

## Dependencies

- `framer-motion`: `useScroll`, `useTransform`, `motion.div` — already installed
- `lucide-react`: `ExternalLink` — already installed
- Tailwind CSS — already configured

No new dependencies required.

---

## Out of Scope

- Changes to `content.js`
- Changes to any other section components
- Adding `accentColor` field to data (colors are defined inside the component)
