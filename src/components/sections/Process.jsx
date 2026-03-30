import React from 'react'
import { motion } from 'framer-motion'
import { process as processData } from '../../data/content'

const COLOR = {
  teal: {
    bg:     'bg-teal-500',
    border: 'border-teal-500/30',
    glow:   'shadow-teal-500/50',
    pulse:  'bg-teal-500',
    label:  'text-teal-400',
  },
  blue: {
    bg:     'bg-blue-500',
    border: 'border-blue-500/30',
    glow:   'shadow-blue-500/50',
    pulse:  'bg-blue-500',
    label:  'text-blue-400',
  },
}

export default function Process() {
  return (
    <section
      id="process"
      className="py-28 px-6 section-divider bg-line-grid"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white">
            {processData.sectionTitle}
          </h2>
        </motion.div>

        {/* ── Steps ── */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-7 right-[12.5%] left-[12.5%] h-px">
            <motion.div
              className="h-full bg-gradient-to-l from-transparent via-teal-500/25 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ transformOrigin: 'right' }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {processData.steps.map((step, i) => {
              const c = COLOR[step.color] ?? COLOR.teal

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.13 }}
                  className="relative flex flex-col items-center md:items-start text-center md:text-right h-full"
                >
                  {/* Number bubble */}
                  <div className="relative mb-6 flex justify-center md:justify-start w-full">
                    <div
                      className={`relative w-12 h-12 md:w-14 md:h-14 ${c.bg} rounded-2xl flex items-center justify-center shadow-lg ${c.glow}`}
                    >
                      <span className="font-rajdhani font-bold text-xl md:text-2xl text-white relative z-10">
                        {step.number}
                      </span>
                      {/* Pulsing ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl ${c.pulse} opacity-0`}
                        animate={{ scale: [1, 1.55, 1], opacity: [0, 0.25, 0] }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          delay: i * 0.55,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`
                      w-full h-full flex flex-col
                      bg-slate-900 sm:bg-white/[0.04] sm:backdrop-blur-xl
                      border ${c.border}
                      rounded-2xl p-4 md:p-6
                    `}
                  >
                    <h3 className="font-rajdhani font-bold text-lg md:text-xl text-white mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 font-assistant text-xs md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
