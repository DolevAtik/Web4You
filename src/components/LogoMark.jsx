import React from 'react'
import { motion } from 'framer-motion'

/**
 * Shared WEB4YOU brand mark.
 * Pass `className` to control font-size (e.g. "text-xl", "text-5xl").
 */
export default function LogoMark({ className = 'text-2xl' }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Real text */}
      <span className="relative font-rajdhani font-black tracking-[0.05em]">
        <span className="text-white">Web</span>
        <span className="text-teal-400">4</span>
        <span className="text-white">You</span>
      </span>
    </div>
  )
}
