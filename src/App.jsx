import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import Benefits from './components/sections/Benefits'
import Process from './components/sections/Process'
import Portfolio from './components/sections/Portfolio'
import ContactSection from './components/sections/ContactSection'
import ContactForm from './components/sections/ContactForm'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div
      dir="rtl"
      className="bg-slate-950 text-gray-100 overflow-x-hidden font-assistant relative"
    >
      {/* CRT Scanlines Overlay */}
      <div className="crt-overlay" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <Benefits />
        <Process />
        <Portfolio />
        <ContactForm />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
