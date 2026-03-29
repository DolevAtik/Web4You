import React from 'react'
import { brand, footer } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Brand + tagline centered */}
        <div className="text-center mb-10">
          <div className="font-rajdhani font-bold text-2xl bg-gradient-to-l from-teal-400 to-blue-400 bg-clip-text text-transparent mb-3">
            {brand.name}
          </div>
          <p className="text-gray-500 font-assistant text-sm leading-relaxed max-w-sm mx-auto">
            {footer.tagline}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-gray-600 text-xs font-assistant">{footer.copyright}</p>
          <p className="text-gray-500 text-xs font-assistant">
            נבנה על ידי{' '}
            <a
              href="https://www.linkedin.com/in/tomer-cohen-486457346/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-400 transition-colors"
            >
              תומר כהן
            </a>
            {' '}ו{' '}
            <a
              href="https://www.linkedin.com/in/dolev-atik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-400 transition-colors"
            >
              דולב עתיק
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
