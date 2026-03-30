import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, DollarSign, Globe, Paintbrush, Zap } from 'lucide-react'
import { benefits } from '../../data/content'

// Map icon string names → Lucide components
const ICON_MAP = { Zap, Paintbrush, Globe, BarChart3, DollarSign }

const COLOR = {
  teal: {
    iconBg:   'bg-teal-500/[0.15]',
    icon:     'text-teal-400',
    border:   'border-teal-500/30',
    hover:    'hover:border-teal-400/50',
    glow:     'hover:shadow-teal-500/10',
  },
  blue: {
    iconBg:   'bg-blue-500/[0.15]',
    icon:     'text-blue-400',
    border:   'border-blue-500/30',
    hover:    'hover:border-blue-400/50',
    glow:     'hover:shadow-blue-500/10',
  },
  violet: {
    iconBg:   'bg-violet-500/[0.15]',
    icon:     'text-violet-400',
    border:   'border-violet-500/30',
    hover:    'hover:border-violet-400/50',
    glow:     'hover:shadow-violet-500/10',
  },
  orange: {
    iconBg:   'bg-orange-500/[0.15]',
    icon:     'text-orange-400',
    border:   'border-orange-500/30',
    hover:    'hover:border-orange-400/50',
    glow:     'hover:shadow-orange-500/10',
  },
  emerald: {
    iconBg:   'bg-emerald-500/[0.15]',
    icon:     'text-emerald-400',
    border:   'border-emerald-500/30',
    hover:    'hover:border-emerald-400/50',
    glow:     'hover:shadow-emerald-500/10',
  },
}

// Float keyframes per card (staggered phase offsets)
const FLOAT = [
  [0, -11, 3, -8,  0],
  [0,  -8, 5, -11, 0],
  [0, -10, 4, -7,  0],
  [0,  -9, 6, -12, 0],
]

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="py-28 px-6 section-divider bg-dot-grid"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-4">
            {benefits.sectionTitle}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-assistant text-lg leading-relaxed">
            {benefits.sectionSubtitle}
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {benefits.items.map((item, i) => {
            const Icon   = ICON_MAP[item.icon] ?? Zap
            const colors = COLOR[item.color]   ?? COLOR.teal

            return (
              // Outer: scroll-reveal entrance
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full"
              >
                {/* Inner: continuous water float */}
                <motion.div
                  animate={{ y: FLOAT[i] }}
                  transition={{
                    duration: 5 + i * 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.8,
                  }}
                  className="will-change-transform h-full"
                >
                  <div
                    className={`
                      h-full group cursor-default
                      bg-slate-900 sm:bg-white/[0.04] sm:backdrop-blur-xl
                      border ${colors.border} ${colors.hover}
                      rounded-2xl p-4 md:p-5
                      transition-all duration-300
                      shadow-xl ${colors.glow} hover:shadow-2xl
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <h3 className="font-rajdhani font-bold text-base md:text-lg text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 font-assistant text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
