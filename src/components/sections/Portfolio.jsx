import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { portfolio } from '../../data/content'

// ── Tag color mapping ─────────────────────────────────────────
const TAG_COLOR = {
  'קייטרינג ואפיה':    'teal',
  'שף פרטי':           'blue',
  'מסחר אלקטרוני':     'teal',
  'פיננסים':           'blue',
  'אירועים':           'teal',
  'מכירות':            'blue',
  'פלטפורמה':          'teal',
  'שירותים מקצועיים': 'blue',
}

function tagCls(tag) {
  const c = TAG_COLOR[tag] ?? 'teal'
  return c === 'teal'
    ? 'bg-teal-500/[0.12] text-teal-300 border-teal-500/25'
    : 'bg-blue-500/[0.12] text-blue-300 border-blue-500/25'
}

// ── Single card ───────────────────────────────────────────────
function PortfolioCard({ item, index, inCarousel = false }) {
  return (
    <motion.div
      initial={inCarousel ? false : { opacity: 0, y: 36, scale: 0.95 }}
      whileInView={inCarousel ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group bg-slate-900 sm:bg-white/[0.04] sm:backdrop-blur-xl border border-white/[0.08] hover:border-teal-500/35 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/[0.08] h-full"
    >
      <div
        className="relative h-44 overflow-hidden cursor-pointer"
        onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-[1.07] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-teal-500/[0.18] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ExternalLink className="text-white w-8 h-8 drop-shadow-lg" />
        </div>
        <span className={`absolute top-3 right-3 font-space-mono text-[10px] px-2.5 py-1 rounded-full border ${tagCls(item.tag)}`}>
          {item.tag}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-rajdhani font-bold text-lg text-white mb-2 text-center">{item.title}</h3>
        <p className="text-gray-400 text-sm font-assistant text-center leading-relaxed">{item.description}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-1.5 text-xs text-teal-400/70 hover:text-teal-300 font-space-mono transition-colors"
        >
          <ExternalLink size={11} /> צפה באתר
        </a>
      </div>
    </motion.div>
  )
}

// ── CTA placeholder card ──────────────────────────────────────
function CTACard({ inCarousel = false }) {
  const { cta } = portfolio
  return (
    <div className="group bg-gradient-to-br from-teal-500/[0.07] to-blue-500/[0.07] border border-dashed border-teal-500/30 hover:border-teal-400/60 rounded-2xl flex flex-col items-center justify-center text-center p-8 transition-all duration-300 h-full min-h-[270px]">
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="will-change-transform text-4xl mb-4"
      >
        🚀
      </motion.div>
      <p className="text-gray-400 mb-5 font-assistant text-sm">{cta.placeholder}</p>
      <a
        href={cta.href}
        onClick={cta.href.startsWith('#') ? undefined : undefined}
        className="font-rajdhani font-bold text-teal-400 hover:text-teal-300 text-lg transition-colors group-hover:underline underline-offset-4"
      >
        {cta.label}
      </a>
    </div>
  )
}

// ── Mobile snap carousel ──────────────────────────────────────
const ALL_ITEMS = [...portfolio.items, null] // null = CTA card

function MobileCarousel() {
  const scrollRef   = useRef(null)
  const [active, setActive] = useState(0)

  // Update dot on scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const cards = el.querySelectorAll('[data-card]')
      if (!cards.length) return
      const cardW = cards[0].getBoundingClientRect().width + 16 // gap-4 = 16px
      setActive(Math.round(el.scrollLeft / cardW))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i) => {
    const el = scrollRef.current
    if (!el) return
    const cards = el.querySelectorAll('[data-card]')
    if (!cards[0]) return
    const cardW = cards[0].getBoundingClientRect().width + 16
    el.scrollTo({ left: i * cardW, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-3"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Left padding so first card isn't flush against edge */}
        <div className="shrink-0 w-4" />

        {ALL_ITEMS.map((item, i) => (
          <motion.div
            key={item?.id ?? 'cta'}
            data-card
            className="snap-start shrink-0 w-[78vw] sm:w-[56vw]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            {item ? (
              <PortfolioCard item={item} index={i} inCarousel />
            ) : (
              <CTACard inCarousel />
            )}
          </motion.div>
        ))}

        {/* Right padding */}
        <div className="shrink-0 w-4" />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {ALL_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'w-6 h-2 bg-teal-400'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Desktop grid ──────────────────────────────────────────────
function DesktopGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {portfolio.items.map((item, i) => (
        <PortfolioCard key={item.id} item={item} index={i} />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15, margin: '-50px' }}
        transition={{ duration: 0.55, delay: portfolio.items.length * 0.07 }}
      >
        <CTACard />
      </motion.div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────
export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 section-divider bg-dot-grid overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="px-6">
          <motion.div
            className="text-center mb-16"
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

        {/* Mobile carousel (no side padding — cards bleed) */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block px-6">
          <DesktopGrid />
        </div>
      </div>
    </section>
  )
}
