import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { contact, hero } from '../../data/content'
import LogoMark from '../LogoMark'
import InteractiveLogo from '../InteractiveLogo'

// ── Typewriter ──────────────────────────────────────────────
const STRINGS = ['שמביא לקוחות', 'שעובד בשבילך', 'שגדל איתך']

function useTypewriter(strings, speed = 75, pause = 800) {
  const [text, setText] = useState('')
  // All mutable state lives in a ref so the effect runs only once
  const s = useRef({ str: 0, char: 0, del: false })

  useEffect(() => {
    let timer
    const tick = () => {
      const { str, char, del } = s.current
      const word = strings[str]

      if (!del) {
        if (char < word.length) {
          setText(word.slice(0, char + 1))
          s.current.char++
          timer = setTimeout(tick, speed)
        } else {
          timer = setTimeout(() => { s.current.del = true; tick() }, pause)
        }
      } else {
        if (char > 0) {
          setText(word.slice(0, char - 1))
          s.current.char--
          timer = setTimeout(tick, speed / 2.2)
        } else {
          s.current.del = false
          s.current.str = (str + 1) % strings.length
          timer = setTimeout(tick, 350)
        }
      }
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return text
}

// ── Animation variants ───────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

// ── Component ────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(STRINGS)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start justify-center pt-14 sm:pt-24 overflow-hidden bg-dot-grid"
    >
      {/* ── Animated blobs — desktop only ── */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle, rgba(20,184,166,0.11) 0%, transparent 68%)',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-64 -left-48 w-[560px] h-[560px] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 68%)',
          }}
          animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(ellipse, rgba(74,222,128,0.04) 0%, transparent 60%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Brand Header */}
        <motion.div variants={item} className="flex flex-col items-center gap-1 mb-8 relative">
          <InteractiveLogo size="md" />
          <LogoMark className="text-4xl sm:text-5xl md:text-8xl" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="font-rajdhani font-bold text-[10vw] sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-tight mb-5"
        >
          <span className="text-white whitespace-nowrap">אנחנו בונים לך אתר</span>
          <br />
          <span className="bg-gradient-to-l from-teal-300 via-teal-400 to-blue-400 bg-clip-text text-transparent text-glow-teal">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="inline-block mr-0.5"
            >
              |
            </motion.span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-assistant leading-relaxed"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href={hero.ctaPrimary.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-3 bg-gradient-to-l from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 px-8 py-4 rounded-xl font-rajdhani font-bold text-lg text-white shadow-2xl shadow-teal-500/25 transition-all duration-300"
          >
            {hero.ctaPrimary.label}
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
          </motion.a>

        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {hero.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.15, duration: 0.55 }}
            >
              <div
                className={`font-rajdhani font-bold text-3xl md:text-4xl ${stat.color === 'teal' ? 'text-teal-400' : 'text-blue-400'
                  }`}
              >
                {stat.value}
              </div>
              <p className="text-gray-500 text-xs mt-1 font-assistant leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          className="w-px h-14 bg-gradient-to-b from-teal-500/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ transformOrigin: 'top' }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
