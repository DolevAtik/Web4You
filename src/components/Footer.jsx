import React from 'react'
import { brand, footer } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="font-rajdhani font-bold text-2xl bg-gradient-to-l from-teal-400 to-blue-400 bg-clip-text text-transparent mb-3">
              {brand.name}
            </div>
            <p className="text-gray-500 font-assistant text-sm leading-relaxed">
              {footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-rajdhani font-bold text-white mb-4">ניווט מהיר</h4>
            <div className="space-y-2">
              {footer.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="block text-gray-500 hover:text-teal-400 text-sm transition-colors font-assistant"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-rajdhani font-bold text-white mb-4">יצירת קשר</h4>
            <div className="space-y-2">
              {footer.contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-500 hover:text-blue-400 text-sm transition-colors font-assistant"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs font-assistant">{footer.copyright}</p>
          <p className="text-gray-600 text-xs font-assistant">{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
