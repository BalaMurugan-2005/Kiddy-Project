'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function BackgroundEffects() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
      
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const sparkles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Sparkles */}
      {sparkles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neon-cyan"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * dimensions.height],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            boxShadow: '0 0 10px #00E5FF, 0 0 20px #00E5FF',
          }}
        />
      ))}

      {/* Film Reel Icons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`reel-${i}`}
          className="absolute text-6xl opacity-5"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            rotate: 0,
          }}
          animate={{
            rotate: 360,
            y: [null, Math.random() * dimensions.height],
          }}
          transition={{
            rotate: {
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            },
            y: {
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'reverse' as const,
            },
          }}
        >
          🎬
        </motion.div>
      ))}
    </div>
  )
}

