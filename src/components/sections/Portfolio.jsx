import React, { useRef, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
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

const SLOT_PX = 270 // must match the container slot height

// ── Single sticky card ────────────────────────────────────────
function StickyCard({ item, index, containerRef }) {
  const accent  = GLOW_MAP[ACCENT_MAP[item.id] ?? 'teal']
  const opacity = useMotionValue(1)
  const scale   = useMotionValue(1)

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      // Distance from document top to container top
      const containerTop = el.getBoundingClientRect().top + window.scrollY
      const scrolled = Math.max(0, window.scrollY - containerTop)

      // This card fades during slot (index+1): from pixel (i+1)*SLOT_PX to (i+1.3)*SLOT_PX
      const fadeFrom = (index + 1) * SLOT_PX
      const fadeTo   = fadeFrom + SLOT_PX * 0.3

      if (scrolled <= fadeFrom) {
        opacity.set(1)
        scale.set(1)
      } else if (scrolled >= fadeTo) {
        opacity.set(0)
        scale.set(0.93)
      } else {
        const t = (scrolled - fadeFrom) / (fadeTo - fadeFrom)
        opacity.set(1 - t)
        scale.set(1 - t * 0.07)
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update() // initialise on mount
    return () => window.removeEventListener('scroll', update)
  }, [index, containerRef, opacity, scale])

  return (
    <div
      className="sticky"
      style={{ top: `calc(10vh + ${index * 10}px)`, zIndex: index + 1, height: `${SLOT_PX}px` }}
    >
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          opacity,
          scale,
          boxShadow: accent.shadow,
          border: `1px solid ${accent.border}`,
          transformOrigin: 'top center',
          aspectRatio: '3 / 2',
        }}
        className="relative block w-full rounded-2xl overflow-hidden cursor-pointer group"
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Bottom-Left Tag */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
           <span
             className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase shadow-lg backdrop-blur-md"
             style={{ backgroundColor: accent.tagBg, color: accent.tagText, border: `1px solid ${accent.border}` }}
           >
             {item.tag}
           </span>
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent backdrop-blur-[2px]">
          <div className="flex flex-col gap-1 md:gap-2">
            {/* Title */}
            <h3 className="font-rajdhani font-bold text-lg md:text-2xl text-white leading-none">
              {item.title}
            </h3>

            {/* Description */}
            <p className="font-assistant text-xs md:text-sm text-gray-300 leading-tight md:leading-relaxed max-w-[90%] whitespace-pre-line line-clamp-2 md:line-clamp-none">
              {item.description}
            </p>
          </div>
        </div>
      </motion.a>
    </div>
  )
}

// ── CTA sticky card ───────────────────────────────────────────
function CTACard({ index, total }) {
  const { cta } = portfolio
  return (
    <div
      className="sticky"
      style={{ top: `calc(10vh + ${index * 10}px)`, zIndex: index + 1, height: `${SLOT_PX}px` }}
    >
      <div className="relative w-full rounded-2xl bg-[#0B1120] border border-dashed border-teal-500/30 flex flex-col items-center justify-center text-center p-8" style={{ aspectRatio: '3 / 2' }}>
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="will-change-transform text-4xl mb-4"
        >
          🚀
        </motion.div>
        <p className="text-gray-400 mb-4 font-assistant text-base">{cta.placeholder}</p>
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

// ── Main section ──────────────────────────────────────────────
export default function Portfolio() {
  const containerRef = useRef(null)
  const total = portfolio.items.length // 9 project cards

  return (
    <section
      id="portfolio"
      className="relative w-full bg-dot-grid section-divider py-20"
      style={{ overflow: 'visible' }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-4">
            {portfolio.sectionTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-assistant text-lg leading-relaxed antialiased whitespace-pre-line">
            {portfolio.sectionSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Sticky stack — block layout, explicit height for reliable scroll tracking */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl mx-auto px-12 md:px-24 mb-10 md:mb-20"
        style={{
          overflow: 'visible',
          height: `calc(${(total + 1) * SLOT_PX}px + 40vh)`,
        }}
      >
        {portfolio.items.map((item, i) => (
          <StickyCard
            key={item.id}
            item={item}
            index={i}
            containerRef={containerRef}
          />
        ))}
        <CTACard index={total} total={total} />
      </div>
    </section>
  )
}
