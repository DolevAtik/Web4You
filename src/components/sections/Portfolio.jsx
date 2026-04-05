import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { portfolio } from '../../data/content'

const SPLIT_INDEX = 5

// ── Glow palette ──────────────────────────────────────────────
const GLOW_MAP = {
  amber:   { shadow: '0 0 60px -10px rgba(245,158,11,0.5)',  border: 'rgba(245,158,11,0.35)',  tagBg: 'rgba(245,158,11,0.12)',  tagText: '#fbbf24' },
  rose:    { shadow: '0 0 60px -10px rgba(244,63,94,0.5)',   border: 'rgba(244,63,94,0.35)',   tagBg: 'rgba(244,63,94,0.12)',   tagText: '#fb7185' },
  emerald: { shadow: '0 0 60px -10px rgba(16,185,129,0.5)',  border: 'rgba(16,185,129,0.35)',  tagBg: 'rgba(16,185,129,0.12)',  tagText: '#34d399' },
  blue:    { shadow: '0 0 60px -10px rgba(59,130,246,0.5)',  border: 'rgba(59,130,246,0.35)',  tagBg: 'rgba(59,130,246,0.12)',  tagText: '#60a5fa' },
  violet:  { shadow: '0 0 60px -10px rgba(139,92,246,0.5)',  border: 'rgba(139,92,246,0.35)',  tagBg: 'rgba(139,92,246,0.12)',  tagText: '#a78bfa' },
  orange:  { shadow: '0 0 60px -10px rgba(249,115,22,0.5)',  border: 'rgba(249,115,22,0.35)',  tagBg: 'rgba(249,115,22,0.12)',  tagText: '#fb923c' },
  pink:    { shadow: '0 0 60px -10px rgba(236,72,153,0.5)',  border: 'rgba(236,72,153,0.35)',  tagBg: 'rgba(236,72,153,0.12)',  tagText: '#f472b6' },
  cyan:    { shadow: '0 0 60px -10px rgba(6,182,212,0.5)',   border: 'rgba(6,182,212,0.35)',   tagBg: 'rgba(6,182,212,0.12)',   tagText: '#22d3ee' },
  green:   { shadow: '0 0 60px -10px rgba(34,197,94,0.5)',   border: 'rgba(34,197,94,0.35)',   tagBg: 'rgba(34,197,94,0.12)',   tagText: '#4ade80' },
  teal:    { shadow: '0 0 60px -10px rgba(20,184,166,0.5)',  border: 'rgba(20,184,166,0.35)',  tagBg: 'rgba(20,184,166,0.12)',  tagText: '#2dd4bf' },
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

// Shared glow shadow for the CTA/Gate cards
const CARD_GLOW = '0 0 0 1px rgba(20,184,166,0.28), 0 0 50px -8px rgba(20,184,166,0.30), 0 0 100px -20px rgba(20,184,166,0.15)'

// ── Single sticky card ────────────────────────────────────────
// Always uses the "loose stack" behaviour (same on all screen sizes)
function StickyCard({ item, index, containerRef, slotPx }) {
  const accent  = GLOW_MAP[ACCENT_MAP[item.id] ?? 'teal']
  const opacity = useMotionValue(1)
  const y       = useMotionValue(0)
  const dim     = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const containerTop = el.getBoundingClientRect().top + window.scrollY
      const scrolled  = Math.max(0, window.scrollY - containerTop)
      const fadeStart = index * slotPx
      const fadeEnd   = (index + 1) * slotPx

      if (scrolled < fadeStart) {
        opacity.set(1); y.set(0); dim.set(0)
      } else if (scrolled < fadeEnd) {
        const t = (scrolled - fadeStart) / slotPx
        y.set(-t * 80)
        opacity.set(1 - t * 0.2)
        dim.set(t * 0.90)
      } else {
        y.set(-80); opacity.set(0.8); dim.set(0.85)
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [index, containerRef, opacity, y, slotPx, dim])

  return (
    <div
      className="sticky"
      style={{ top: `calc(10vh + ${index * 45}px)`, zIndex: 10 + index, height: `${slotPx}px` }}
    >
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          opacity, y,
          boxShadow: accent.shadow,
          border: `1px solid ${accent.border}`,
          transformOrigin: 'center center',
          aspectRatio: '3 / 2',
        }}
        className="relative block w-full rounded-2xl overflow-hidden cursor-pointer group"
      >
        <img src={item.image} alt={item.title} loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
        <motion.div className="absolute inset-0 bg-slate-950/80 z-10 pointer-events-none" style={{ opacity: dim }} />

        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] md:text-sm font-bold tracking-wider uppercase shadow-lg backdrop-blur-md"
            style={{ backgroundColor: accent.tagBg, color: accent.tagText, border: `1px solid ${accent.border}` }}
          >
            {item.tag}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-transparent backdrop-blur-[2px] z-20">
          <div className="flex flex-col gap-1 md:gap-3">
            <h3 className="font-rajdhani font-bold text-xl md:text-3xl text-white leading-none">{item.title}</h3>
            <p className="font-assistant text-xs md:text-base text-gray-300 leading-tight md:leading-relaxed max-w-[90%] whitespace-pre-line antialiased">
              {item.description}
            </p>
          </div>
        </div>
      </motion.a>
    </div>
  )
}

// ── Shared dark card shell ────────────────────────────────────
function DarkCardShell({ index, slotPx, children }) {
  return (
    <div
      className="sticky"
      style={{ top: `calc(10vh + ${index * 45}px)`, zIndex: 10 + index, height: `${slotPx}px` }}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: '3 / 2', boxShadow: CARD_GLOW }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#070d1a]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20,184,166,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.07) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />
        {/* Glow border */}
        <div className="absolute inset-0 rounded-2xl" style={{ border: '1px solid rgba(20,184,166,0.22)' }} />
        {children}
      </div>
    </div>
  )
}

// ── Gate card ─────────────────────────────────────────────────
function GateCard({ index, slotPx, onShowMore }) {
  return (
    <DarkCardShell index={index} slotPx={slotPx}>
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 md:gap-4 p-6 md:p-10 text-center">

        {/* Decorative dots */}
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-l from-teal-500/50 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
          <div className="h-px w-12 bg-gradient-to-r from-teal-500/50 to-transparent" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="font-assistant text-slate-400 text-sm md:text-base leading-relaxed">
            רוצה לראות עוד עבודות שלנו?
          </p>
          <h3 className="font-rajdhani font-bold text-2xl md:text-4xl text-white leading-tight">
            יש עוד <span className="text-teal-400">פרויקטים</span>
          </h3>
        </div>

        {/* Show more button */}
        <motion.button
          onClick={onShowMore}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-3 px-7 py-2.5 md:px-10 md:py-4 rounded-xl font-rajdhani font-bold text-base md:text-xl text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.25), rgba(20,184,166,0.1))',
            border: '1px solid rgba(20,184,166,0.35)',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative">לחץ להצגת פרויקטים נוספים</span>
          <motion.span
            className="relative text-teal-400 text-lg"
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >←</motion.span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-[200px]">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
          <span className="font-assistant text-[11px] text-slate-500 shrink-0">או</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="font-assistant text-slate-400 text-sm leading-relaxed">
            וגם הפרויקט שלך יכול להיות כאן
          </p>
          <motion.a
            href={portfolio.cta.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 font-rajdhani font-bold text-lg md:text-xl text-teal-400 hover:text-white transition-all duration-300"
          >
            בואו נתחיל
            <motion.span
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="inline-block"
            >←</motion.span>
          </motion.a>
        </div>
      </div>
    </DarkCardShell>
  )
}

// ── Final CTA card ────────────────────────────────────────────
function CTACard({ index, slotPx, onClose }) {
  return (
    <DarkCardShell index={index} slotPx={slotPx}>
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 md:gap-5 p-8 text-center">

        {/* Close button at top */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/60 text-[11px] font-assistant text-slate-400 hover:text-white hover:border-teal-500/40 transition-all duration-300"
        >
          <ChevronUp size={12} className="text-teal-400" />
          סגור פרויקטים נוספים
        </button>

        {/* Decorative dots */}
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-l from-teal-500/50 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
          <div className="h-px w-12 bg-gradient-to-r from-teal-500/50 to-transparent" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="font-assistant text-slate-400 text-sm md:text-base leading-relaxed">
            וגם הפרויקט שלך יכול להיות כאן
          </p>
          <h3 className="font-rajdhani font-bold text-2xl md:text-4xl text-white leading-tight">
            בואו נבנה משהו <span className="text-teal-400">מדהים</span>
          </h3>
        </div>

        <motion.a
          href={portfolio.cta.href}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-3 px-8 py-3 md:px-10 md:py-4 rounded-xl font-rajdhani font-bold text-base md:text-xl text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.25), rgba(20,184,166,0.1))',
            border: '1px solid rgba(20,184,166,0.35)',
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative">בואו נתחיל</span>
          <motion.span
            className="relative text-teal-400"
            animate={{ x: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >←</motion.span>
        </motion.a>
      </div>
    </DarkCardShell>
  )
}

// ── Main section ──────────────────────────────────────────────
export default function Portfolio() {
  const containerRef = useRef(null)
  const [showExtra, setShowExtra] = useState(false)
  const [isMobile, setIsMobile]   = useState(false)

  useEffect(() => {
    const handleCheck = () => setIsMobile(window.innerWidth < 768)
    handleCheck()
    window.addEventListener('resize', handleCheck)
    return () => window.removeEventListener('resize', handleCheck)
  }, [])

  const displayedItems = showExtra ? portfolio.items : portfolio.items.slice(0, SPLIT_INDEX)
  const total   = displayedItems.length
  const slotPx  = isMobile ? 400 : 600
  const buffer  = isMobile ? '20vh' : '60vh'
  const containerHeight = `calc(${(total + 1) * slotPx}px + ${buffer})`

  const handleShowMore = () => {
    const containerTop = containerRef.current
      ? containerRef.current.getBoundingClientRect().top + window.scrollY
      : 0
    setShowExtra(true)
    setTimeout(() => {
      window.scrollTo({ top: containerTop + (SPLIT_INDEX - 0.6) * slotPx, behavior: 'smooth' })
    }, 50)
  }

  const handleClose = () => {
    const containerTop = containerRef.current
      ? containerRef.current.getBoundingClientRect().top + window.scrollY
      : 0
    setShowExtra(false)
    setTimeout(() => {
      window.scrollTo({ top: containerTop + (SPLIT_INDEX - 0.5) * slotPx, behavior: 'smooth' })
    }, 50)
  }

  return (
    <section id="portfolio" className="relative w-full bg-dot-grid section-divider py-20" style={{ overflow: 'visible' }}>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-4">{portfolio.sectionTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-assistant text-lg leading-relaxed antialiased whitespace-pre-line">{portfolio.sectionSubtitle}</p>
        </motion.div>
      </div>

      {/* Sticky stack */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl mx-auto px-6 md:px-24 mb-10 md:mb-20"
        style={{ overflow: 'visible', height: containerHeight }}
      >
        {displayedItems.map((item, i) => (
          <StickyCard
            key={item.id}
            item={item}
            index={i}
            containerRef={containerRef}
            slotPx={slotPx}
          />
        ))}

        {!showExtra && (
          <GateCard index={total} slotPx={slotPx} onShowMore={handleShowMore} />
        )}

        {showExtra && (
          <CTACard index={total} slotPx={slotPx} onClose={handleClose} />
        )}
      </div>
    </section>
  )
}
