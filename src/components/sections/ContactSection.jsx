import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { contactSection } from '../../data/content'

const ICON_MAP = { MessageCircle, Phone, Mail }

const COLOR = {
  teal: {
    iconBg:  'bg-teal-500/[0.12]',
    icon:    'text-teal-400',
    border:  'border-teal-500/25',
    hover:   'hover:border-teal-400/55',
    display: 'text-teal-400',
  },
  blue: {
    iconBg:  'bg-blue-500/[0.12]',
    icon:    'text-blue-400',
    border:  'border-blue-500/25',
    hover:   'hover:border-blue-400/55',
    display: 'text-blue-400',
  },
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-28 px-6 section-divider bg-line-grid"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          <span className="font-space-mono text-xs text-blue-400 tracking-widest mb-4 block">
            // contact.us
          </span>
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-4">
            {contactSection.sectionTitle}
          </h2>
          <p className="text-xl text-gray-400 mb-16 font-assistant">
            {contactSection.sectionSubtitle}
          </p>
        </motion.div>

        {/* Channels */}
        <div className="grid md:grid-cols-3 gap-6">
          {contactSection.channels.map((ch, i) => {
            const Icon   = ICON_MAP[ch.icon] ?? Mail
            const colors = COLOR[ch.color]   ?? COLOR.teal

            return (
              <motion.a
                key={ch.id}
                href={ch.href}
                target={ch.external ? '_blank' : undefined}
                rel={ch.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 36, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`
                  group block
                  bg-slate-900 sm:bg-white/[0.04] sm:backdrop-blur-xl
                  border ${colors.border} ${colors.hover}
                  rounded-2xl p-8
                  transition-all duration-300
                  shadow-lg hover:shadow-2xl
                `}
              >
                <div
                  className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-8 h-8 ${colors.icon}`} strokeWidth={1.6} />
                </div>

                <h3 className="font-rajdhani font-bold text-xl text-white mb-2">
                  {ch.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 font-assistant">
                  {ch.description}
                </p>
                <span className={`font-space-mono text-sm font-semibold ${colors.display}`}>
                  {ch.display}
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
