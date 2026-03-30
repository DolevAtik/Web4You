import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

/**
 * Interactive Logo Component
 * - 3D Tilt effect on hover
 * - Shimmer sweep animation
 * - Subtle floating and glow
 */
export default function InteractiveLogo({ className = '', size = 'md' }) {
  const containerRef = useRef(null)

  // Motion values for mouse position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smoothing the motion
  const mouseX = useSpring(x, { stiffness: 120, damping: 25 })
  const mouseY = useSpring(y, { stiffness: 120, damping: 25 })

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])

  // Parallax shift for the image itself (magnetic feel)
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-12, 12])
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-12, 12])

  const handleMouseMove = (event) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const moveX = (event.clientX - rect.left) / width - 0.5
    const moveY = (event.clientY - rect.top) / height - 0.5
    x.set(moveX)
    y.set(moveY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Size mapping
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-48 h-32 md:w-64 md:h-48',
    lg: 'w-80 h-64 md:w-[600px] md:h-[450px]',
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block perspective-1000 ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Floating & 3D Tilt Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full relative"
      >
        {/* Logo Wrapper */}
        <div className="relative w-full h-full group preserve-3d">
          {/* Logo Image with Enhance Filter */}
          <motion.img
            src="/images/logo.png"
            alt="Web4You Logo"
            className="w-full h-full object-contain relative z-10"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) contrast(1.05)',
              translateZ: '50px', // Extra depth
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
