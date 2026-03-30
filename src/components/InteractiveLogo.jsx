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
      {/* Background Animated Glows */}
      <motion.div
        className="absolute inset-0 bg-teal-500/20 blur-[60px] rounded-full pointer-events-none z-0"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none z-0"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [30, -30]),
          y: useTransform(mouseY, [-0.5, 0.5], [30, -30]),
        }}
        aria-hidden="true"
      />

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
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(20,184,166,0.55)]"
            style={{
              mixBlendMode: 'screen',
              filter: 'brightness(1.15) contrast(1.1)',
              translateZ: '50px', // Extra depth
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Shimmer Sweep Animation */}
          <motion.div
            className="absolute inset-x-0 inset-y-0 w-1/3 -skew-x-12 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
              translateZ: '60px',
            }}
            animate={{
              x: ['-200%', '400%'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Mouse Follow Glow / Reflection */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 rounded-full"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([mx, my]) => `radial-gradient(circle at ${50 + mx * 100}% ${50 + my * 100}%, rgba(20,184,166,0.15), transparent 70%)`
            ),
            translateZ: '100px',
          }}
        />
      </motion.div>
    </div>
  )
}
