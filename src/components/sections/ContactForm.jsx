import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import { contact } from '../../data/content'

const BUSINESS_TYPES = [
  'מסעדה / קייטרינג',
  'בוטיק / אופנה',
  'יועץ / מאמן',
  'רופא / קליניקה',
  'אדריכל / עיצוב פנים',
  'עורך דין / רואה חשבון',
  'קוסמטיקה / ספא',
  'בנייה / שיפוץ',
  'חינוך / הדרכה',
  'אחר',
]

const GOALS = [
  'אתר עסקי / ביקורינג',
  'דף נחיתה',
  'חנות אינטרנטית',
  'פורטפוליו / גלריה',
  'עדיין לא בטוח',
]

const INPUT_CLS = `
  w-full bg-white/[0.04] border border-white/10 focus:border-teal-500/60
  rounded-xl px-4 py-3 text-white text-base font-assistant
  placeholder:text-gray-500 outline-none transition-all duration-200
  focus:bg-white/[0.07] focus:shadow-[0_0_0_1px_rgba(20,184,166,0.25)]
`

const SELECT_CLS = INPUT_CLS + ' appearance-none cursor-pointer'

export default function ContactForm() {
  const formRef  = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData(formRef.current)
    const body = {}
    data.forEach((v, k) => { body[k] = v })

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setStatus('success')
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact-form"
      className="py-28 px-6 section-divider bg-dot-grid"
    >
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15, margin: '-50px' }}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white mb-4">
            השאר פרטים
          </h2>
          <p className="text-gray-400 font-assistant text-lg">
            נחזור אליך תוך שעות ספורות עם הצעה מותאמת אישית
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1, margin: '-50px' }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="bg-slate-900 sm:bg-white/[0.04] sm:backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center text-center py-8 gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                >
                  <CheckCircle className="text-teal-400 w-16 h-16" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">
                    קיבלנו! 🎉
                  </h3>
                  <p className="text-gray-400 font-assistant">
                    נחזור אליך בהקדם עם הצעה מותאמת לעסק שלך.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-teal-400 hover:text-teal-300 text-sm font-assistant transition-colors"
                >
                  שלח פרטים נוספים
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Hidden formsubmit fields */}
                <input type="hidden" name="_subject" value="ליד חדש מ-Web4You" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} />

                {/* Row: Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5 font-assistant">שם מלא *</label>
                    <input
                      name="name"
                      required
                      placeholder="ישראל ישראלי"
                      className={INPUT_CLS}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 font-assistant" dir="rtl">
                      טלפון *
                    </label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="050-0000000"
                      className={INPUT_CLS}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Business name */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-assistant">שם העסק</label>
                  <input
                    name="business_name"
                    placeholder="מה שם העסק שלך?"
                    className={INPUT_CLS}
                  />
                </div>

                {/* Row: Business type + Goal */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5 font-assistant">סוג העסק</label>
                    <select name="business_type" className={SELECT_CLS} defaultValue="">
                      <option value="" disabled className="bg-slate-900">בחר סוג עסק</option>
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-slate-900">{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5 font-assistant">מה אתה מחפש?</label>
                    <select name="goal" className={SELECT_CLS} defaultValue="">
                      <option value="" disabled className="bg-slate-900">סוג האתר</option>
                      {GOALS.map((g) => (
                        <option key={g} value={g} className="bg-slate-900">{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-assistant">
                    ספר לנו קצת על הפרויקט
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="מה אתה רוצה שהאתר יעשה בשבילך?"
                    className={INPUT_CLS + ' resize-none'}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-red-400 text-sm font-assistant text-center">
                    משהו השתבש. נסה שוב או פנה ישירות ל-{contact.phone}
                  </p>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-l from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-4 rounded-xl font-rajdhani font-bold text-lg text-white shadow-2xl shadow-teal-500/25 transition-all duration-300"
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      שולח...
                    </>
                  ) : (
                    <>
                      שלח פרטים
                      <Send size={18} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-600 text-xs font-assistant">
                  או דברו איתנו ישירות:
                  <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 mr-1">
                    וואטסאפ
                  </a>
                  ·
                  <a href={contact.phoneHref} className="text-teal-500 hover:text-teal-400 mr-1 mr-1">
                    {contact.phone}
                  </a>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
