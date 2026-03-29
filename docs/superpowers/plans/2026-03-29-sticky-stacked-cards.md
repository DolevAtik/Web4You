# Sticky Stacked Cards — Portfolio Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Portfolio section (mobile carousel + desktop grid) with a unified Sticky Stacked Cards scroll effect — 9 project cards + 1 CTA card, each `h-[80vh]`, stacking with Framer Motion scale/opacity.

**Architecture:** Complete rewrite of `src/components/sections/Portfolio.jsx`. A `containerRef` passed to `useScroll` drives `scrollYProgress` (0→1). Each card is wrapped in a `100vh` spacer `<div>` (provides scroll budget) with increasing `z-index`. Inside each spacer the actual card is `sticky top-[10vh]`. `useTransform` maps the scroll range for card `i` to `scale` (1→0.92) and `opacity` (1→0.7). The CTA card at the end gets no transform. The app is `dir="rtl"`, so flex row naturally places the first child on the right.

**Tech Stack:** React 18, Framer Motion (`useScroll`, `useTransform`, `motion.div`), Tailwind CSS, Lucide React — all already installed.

---

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| **Rewrite** | `src/components/sections/Portfolio.jsx` | All sub-components + main export |
| **Unchanged** | `src/data/content.js` | Data source |

---

### Task 1: Define GLOW_MAP and ACCENT_MAP constants

**Files:**
- Modify: `src/components/sections/Portfolio.jsx`

- [ ] **Step 1: Replace the entire file content with the new skeleton + constants**

Open `src/components/sections/Portfolio.jsx` and replace everything with:

```jsx
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { portfolio } from '../../data/content'

// ── Glow palette ──────────────────────────────────────────────
const GLOW_MAP = {
  amber:   { shadow: '0 0 60px -10px rgba(245,158,11,0.5)',  border: 'rgba(245,158,11,0.35)',  tagBg: 'rgba(245,158,11,0.12)',  tagText: '#fbbf24' },
  rose:    { shadow: '0 0 60px -10px rgba(244,63,94,0.5)',   border: 'rgba(244,63,94,0.35)',   tagBg: 'rgba(244,63,94,0.12)',   tagText: '#fb7185' },
  emerald: { shadow: '0 0 60px -10px rgba(16,185,129,0.5)',  border: 'rgba(16,185,129,0.35)',  tagBg: 'rgba(16,185,129,0.12)', tagText: '#34d399' },
  blue:    { shadow: '0 0 60px -10px rgba(59,130,246,0.5)',  border: 'rgba(59,130,246,0.35)',  tagBg: 'rgba(59,130,246,0.12)', tagText: '#60a5fa' },
  violet:  { shadow: '0 0 60px -10px rgba(139,92,246,0.5)',  border: 'rgba(139,92,246,0.35)',  tagBg: 'rgba(139,92,246,0.12)', tagText: '#a78bfa' },
  orange:  { shadow: '0 0 60px -10px rgba(249,115,22,0.5)',  border: 'rgba(249,115,22,0.35)',  tagBg: 'rgba(249,115,22,0.12)', tagText: '#fb923c' },
  pink:    { shadow: '0 0 60px -10px rgba(236,72,153,0.5)',  border: 'rgba(236,72,153,0.35)',  tagBg: 'rgba(236,72,153,0.12)', tagText: '#f472b6' },
  cyan:    { shadow: '0 0 60px -10px rgba(6,182,212,0.5)',   border: 'rgba(6,182,212,0.35)',   tagBg: 'rgba(6,182,212,0.12)',  tagText: '#22d3ee' },
  green:   { shadow: '0 0 60px -10px rgba(34,197,94,0.5)',   border: 'rgba(34,197,94,0.35)',   tagBg: 'rgba(34,197,94,0.12)',  tagText: '#4ade80' },
  teal:    { shadow: '0 0 60px -10px rgba(20,184,166,0.5)',  border: 'rgba(20,184,166,0.35)',  tagBg: 'rgba(20,184,166,0.12)', tagText: '#2dd4bf' },
}

// ── Per-project accent assignment ─────────────────────────────
const ACCENT_MAP = {
  'liel-edri-baking': 'amber',
  'after-taste':      'rose',
  'lital-kitchen':    'emerald',
  'tomer-portfolio':  'blue',
  'or-levy':          'violet',
  'itay-izchaki':     'orange',
  'dl-baloons':       'pink',
  'mentconnect':      'cyan',
  'amit-hadbarot':    'green',
}

export default function Portfolio() {
  return <section id="portfolio"><p className="text-white p-10">placeholder</p></section>
}
```

- [ ] **Step 2: Run dev server and confirm no import errors**

```bash
npm run dev
```

Expected: browser shows "placeholder" text in the Portfolio section, no console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Portfolio.jsx
git commit -m "refactor(portfolio): start sticky-cards rewrite — constants only"
```

---

### Task 2: Build StickyCard layout (no animation)

**Files:**
- Modify: `src/components/sections/Portfolio.jsx`

- [ ] **Step 1: Add the StickyCard component before the Portfolio export**

Insert the following after the `ACCENT_MAP` constant and before the `Portfolio` export:

```jsx
// ── Single sticky project card ────────────────────────────────
function StickyCard({ item, index, totalCards, scrollYProgress }) {
  const accentKey = ACCENT_MAP[item.id] ?? 'teal'
  const accent = GLOW_MAP[accentKey]

  const start = index / totalCards
  const end = (index + 1) / totalCards
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [start, end], [1, 0.7])

  return (
    <div style={{ height: '100vh', position: 'relative', zIndex: (index + 1) * 10 }}>
      <motion.div
        style={{
          scale,
          opacity,
          boxShadow: accent.shadow,
          border: `1px solid ${accent.border}`,
        }}
        className="sticky top-[10vh] h-[80vh] rounded-[2rem] bg-slate-900/90 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Text side — appears on the RIGHT in RTL (order-2 on mobile, order-1 on desktop) */}
        <div className="flex flex-col justify-center p-8 md:p-12 md:flex-1 order-2 md:order-1">
          <span
            className="self-start text-[10px] font-space-mono px-2.5 py-1 rounded-full border mb-4"
            style={{
              background: accent.tagBg,
              color: accent.tagText,
              borderColor: accent.border,
            }}
          >
            {item.tag}
          </span>
          <h3 className="font-rajdhani font-bold text-2xl md:text-4xl text-white mb-4 leading-tight">
            {item.title}
          </h3>
          <p className="text-gray-400 font-assistant text-sm md:text-base leading-relaxed mb-6">
            {item.description}
          </p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start flex items-center gap-2 text-sm font-space-mono transition-opacity hover:opacity-80"
            style={{ color: accent.tagText }}
          >
            <ExternalLink size={14} /> צפה באתר
          </a>
        </div>

        {/* Image side — appears on the LEFT in RTL (order-1 on mobile, order-2 on desktop) */}
        <div className="relative h-[40%] md:h-full md:flex-1 order-1 md:order-2 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
          {/* subtle gradient blending image into card background */}
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900/30 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Update the Portfolio export to render one StickyCard for the first item**

Replace the `Portfolio` export with:

```jsx
export default function Portfolio() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const totalCards = portfolio.items.length + 1

  return (
    <section id="portfolio" className="section-divider bg-dot-grid">
      <div ref={containerRef} className="max-w-5xl mx-auto px-4 md:px-6">
        {portfolio.items.slice(0, 1).map((item, i) => (
          <StickyCard
            key={item.id}
            item={item}
            index={i}
            totalCards={totalCards}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify layout in browser**

```bash
npm run dev
```

Expected: A single card for "Liel Edri Baking" appears with:
- Amber glow border
- Image on the left (RTL), text on the right
- On mobile: image on top, text below
- Card height fills ~80% of viewport

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Portfolio.jsx
git commit -m "feat(portfolio): add StickyCard layout with glow styling"
```

---

### Task 3: Add all project cards and the CTA card

**Files:**
- Modify: `src/components/sections/Portfolio.jsx`

- [ ] **Step 1: Add CTACard component**

Insert after the `StickyCard` function and before the `Portfolio` export:

```jsx
// ── CTA sticky card ───────────────────────────────────────────
function CTACard({ index }) {
  const { cta } = portfolio
  return (
    <div style={{ height: '100vh', position: 'relative', zIndex: (index + 1) * 10 }}>
      <div className="sticky top-[10vh] h-[80vh] rounded-[2rem] bg-gradient-to-br from-teal-500/[0.07] to-blue-500/[0.07] backdrop-blur-xl border border-dashed border-teal-500/30 flex flex-col items-center justify-center text-center p-10">
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="will-change-transform text-5xl mb-6"
        >
          🚀
        </motion.div>
        <p className="text-gray-400 mb-6 font-assistant text-lg">{cta.placeholder}</p>
        <a
          href={cta.href}
          className="font-rajdhani font-bold text-teal-400 hover:text-teal-300 text-xl transition-colors hover:underline underline-offset-4"
        >
          {cta.label}
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update Portfolio export to render all cards**

Replace the `Portfolio` export with the final version:

```jsx
export default function Portfolio() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const totalCards = portfolio.items.length + 1 // +1 for CTA

  return (
    <section id="portfolio" className="section-divider bg-dot-grid">
      {/* Header */}
      <div className="py-28 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          <span className="font-space-mono text-xs text-teal-400 tracking-widest mb-4 block">
            // our.work
          </span>
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-4">
            {portfolio.sectionTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-assistant text-lg leading-relaxed">
            {portfolio.sectionSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Sticky stack */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-4 md:px-6">
        {portfolio.items.map((item, i) => (
          <StickyCard
            key={item.id}
            item={item}
            index={i}
            totalCards={totalCards}
            scrollYProgress={scrollYProgress}
          />
        ))}
        <CTACard index={portfolio.items.length} />
      </div>

      {/* Bottom breathing room */}
      <div className="h-24" />
    </section>
  )
}
```

- [ ] **Step 3: Verify all cards render and stack correctly**

```bash
npm run dev
```

Expected:
- Scrolling down reveals each card stacking on top of the previous one
- Each card has its own glow color (amber → rose → emerald → blue → violet → orange → pink → cyan → green)
- CTA card appears last with teal dashed border and rocket animation
- All 9 project images are visible and correct

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Portfolio.jsx
git commit -m "feat(portfolio): complete sticky stacked cards with CTACard"
```

---

### Task 4: Final verification checklist

**Files:** no changes — read-only verification

- [ ] **Desktop checks**

Open `http://localhost:5173` and scroll through the Portfolio section:

| Check | Expected |
|---|---|
| Cards stack on scroll | Each new card slides over the previous one |
| Scale-down | Card underneath visibly shrinks to ~0.92 scale |
| Opacity dim | Card underneath dims to ~0.7 opacity |
| Glow border | Each card has a distinct colored glow shadow |
| Image layout | Image on LEFT (RTL), text on RIGHT |
| Image fill | Image fills its half of the card, `object-cover` |
| Visit link | Clicking opens the project URL in a new tab |
| CTA card | Last card has dashed teal border, rocket animates |

- [ ] **Mobile checks (resize browser to 375px width)**

| Check | Expected |
|---|---|
| Image on top | Image takes ~40% of card height |
| Text on bottom | Tag, title, description, link all visible |
| Card height | Card fills ~80vh, no overflow |
| Stacking still works | Cards still stack as you scroll |

- [ ] **Navigation check**

Click "עבודות שלנו" in the navbar — page should jump to `#portfolio` section header.

- [ ] **No regressions**

Scroll through the full page:
- Navbar still works
- Hero, Benefits, Process sections render correctly
- ContactForm and ContactSection below Portfolio are accessible
- Footer visible at the bottom
