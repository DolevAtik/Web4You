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

export default function Portfolio() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const totalCards = portfolio.items.length + 1 // +1 for CTA card

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
