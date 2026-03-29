import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import LogoMark from './LogoMark'

const SECTION_IDS = ['benefits', 'process', 'portfolio', 'contact-form', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 sm:backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="shrink-0"
        >
          <LogoMark className="text-sm sm:text-base md:text-lg" />
        </motion.a>

        {/* ── Nav links — all visible ── */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const sectionId = link.href.startsWith('#') ? link.href.slice(1) : null
            const active = !!(sectionId && activeSection === sectionId)

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`
                  relative text-[11px] sm:text-xs md:text-sm lg:text-sm
                  font-semibold font-assistant whitespace-nowrap
                  px-1.5 sm:px-2.5 md:px-3 py-1 rounded-lg
                  transition-all duration-200
                  ${link.highlight
                    ? active
                      ? 'text-teal-300 bg-teal-500/[0.15]'
                      : 'text-teal-400 hover:text-teal-300 hover:bg-teal-500/10'
                    : active
                    ? 'text-white bg-white/[0.06]'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.04]'
                  }
                `}
              >
                {link.label}

                {/* Active dot indicator */}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
