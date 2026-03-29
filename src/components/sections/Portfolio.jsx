import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { portfolio } from '../../data/content'

// ── Glow palette ──────────────────────────────────────────────
const GLOW_MAP = {
  amber:   { shadow: '0 0 60px -10px rgba(245,158,11,0.5)',  border: 'rgba(245,158,11,0.35)',  tagBg: 'rgba(245,158,11,0.12)',  tagText: '#fbbf24' },
  rose:    { shadow: '0 0 60px -10px rgba(244,63,94,0.5)',   border: 'rgba(244,63,94,0.35)',   tagBg: 'rgba(244,63,94,0.12)',   tagText: '#fb7185' },
  emerald: { shadow: '0 0 60px -10px rgba(16,185,129,0.5)',  border: 'rgba(16,185,129,0.35)',  tagBg: 'rgba(16,185,129,0.12)', tagText: '#34d399' },
  blue:    { shadow: '0 0 60px -10px rgba(59,130,246,0.5)',  border: 'rgba(59,130,246,0.35)',  tagBg: 'rgba(59,130,246,0.12)', tagText: '#60a5fa' },
  violet:  { shadow: '0 0 60px -10px rgba(139,92,246,0.5)',  border: 'rgba(139,92,246,0.35)',  tagBg: 'rgba(139,92,246,0.12)', tagText: '#a78bfa' },
  orange:  { shadow: '0 0 60px -10px rgba(249,115,22,0.5)',  border: 'rgba(249,115,22,0.35)',  tagBg: 'rgba(249,115,22,0.12)', tagText: '#fb923c' },
  pink:    { shadow: '0 0 60px -10px rgba(236,72,153,0.5)',  border: 'rgba(236,72,153,0.35)',  tagBg: 'rgba(236,72,153,0.12)', tagText: '#f472b6' },
  cyan:    { shadow: '0 0 60px -10px rgba(6,182,212,0.5)',   border: 'rgba(6,182,212,0.35)',   tagBg: 'rgba(6,182,212,0.12)',  tagText: '#22d3ee' },
  green:   { shadow: '0 0 60px -10px rgba(34,197,94,0.5)',   border: 'rgba(34,197,94,0.35)',   tagBg: 'rgba(34,197,94,0.12)',  tagText: '#4ade80' },
  teal:    { shadow: '0 0 60px -10px rgba(20,184,166,0.5)',  border: 'rgba(20,184,166,0.35)',  tagBg: 'rgba(20,184,166,0.12)', tagText: '#2dd4bf' },
}

// ── Per-project accent assignment ─────────────────────────────
const ACCENT_MAP = {
  'liel-edri-baking': 'amber',
  'after-taste':      'rose',
  'lital-kitchen':    'emerald',
  'tomer-portfolio':  'blue',
  'or-levy':          'violet',
  'itay-izchaki':     'orange',
  'dl-baloons':       'pink',
  'mentconnect':      'cyan',
  'amit-hadbarot':    'green',
}

export default function Portfolio() {
  return <section id="portfolio"><p className="text-white p-10">placeholder</p></section>
}
