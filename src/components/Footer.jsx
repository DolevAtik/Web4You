import React from 'react'
import { brand, footer } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10 px-6" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-assistant text-xs tracking-widest uppercase opacity-80" style={{ color: '#C8A97E' }}>
            {footer.copyright}
          </p>
          <p className="text-gray-500 text-xs font-assistant">
            נבנה על ידי{' '}
            <a
              href="https://www.linkedin.com/in/tomer-cohen-486457346/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:brightness-125"
              style={{ color: '#C8A97E' }}
            >
              תומר כהן
            </a>
            {' '}ו{' '}
            <a
              href="https://www.linkedin.com/in/dolev-atik/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:brightness-125"
              style={{ color: '#C8A97E' }}
            >
              דולב עתיק
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
