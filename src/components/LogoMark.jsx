import React from 'react'
import { motion } from 'framer-motion'

/**
 * Shared WEB4YOU brand mark.
 * Pass `className` to control font-size (e.g. "text-xl", "text-5xl").
 */
export default function LogoMark({ className = 'text-2xl' }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Diffuse glow layer behind text */}
      <span
        className="absolute inset-0 font-rajdhani font-black text-teal-400 pointer-events-none"
        style={{ filter: 'blur(14px)', opacity: 0.42 }}
        aria-hidden
      >
        WEB4YOU
      </span>

      {/* Periodic shimmer sweep */}
      <span className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm" aria-hidden>
        <motion.span
          className="absolute inset-y-0 w-[55%] -skew-x-12"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.11), transparent)',
          }}
          animate={{ x: ['-130%', '210%'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 5.5, ease: 'easeInOut' }}
        />
      </span>

      {/* Real text */}
      <span className="relative font-rajdhani font-black tracking-tight">
        <span className="text-white">WEB</span>
        <span className="logo-four text-teal-400">4</span>
        <span className="text-white">YOU</span>
      </span>
    </div>
  )
}
