import { useEffect, useRef, useState } from 'react'

/**
 * Tracks which section id is currently visible in the viewport
 * using IntersectionObserver. Returns the id of the active section.
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('')
  // Keep a stable ref so the effect doesn't re-run when sectionIds array is recreated
  const idsRef = useRef(sectionIds)

  useEffect(() => {
    const observers = []

    idsRef.current.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        // Trigger when element top crosses 25% from top, exits 55% from bottom
        { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return activeSection
}
