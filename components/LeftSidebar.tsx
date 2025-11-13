'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface LeftSidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
  dreamMode: boolean
}

const navItems = [
  { id: 'create', icon: '🎨', label: 'Create', color: 'from-sky-blue to-blue-400' },
  { id: 'stories', icon: '📖', label: 'Stories', color: 'from-pink to-rose-400' },
  { id: 'studio', icon: '🎬', label: 'Dream Studio', color: 'from-soft-yellow to-yellow-400' },
  { id: 'community', icon: '🌈', label: 'Community', color: 'from-purple-400 to-pink-400' },
  { id: 'settings', icon: '⚙️', label: 'Settings', color: 'from-gray-400 to-gray-600' },
]

export default function LeftSidebar({ activeModule, setActiveModule, dreamMode }: LeftSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block"
    >
      <div className="flex flex-col gap-4">
        {navItems.map((item, index) => {
          const isActive = activeModule === item.id
          const isHovered = hoveredItem === item.id

          return (
            <motion.div
              key={item.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.button
                onClick={() => setActiveModule(item.id)}
                className={`
                  w-12 h-12 md:w-16 md:h-16 rounded-full
                  bg-gradient-to-br ${item.color}
                  flex items-center justify-center
                  text-xl md:text-2xl
                  shadow-lg
                  relative overflow-hidden
                  ${isActive ? 'ring-4 ring-offset-2 ring-offset-white ring-neon-cyan' : ''}
                  ${dreamMode ? 'ring-offset-gray-900' : ''}
                `}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: isActive || isHovered
                    ? [
                        '0 0 20px rgba(129, 212, 250, 0.5)',
                        '0 0 40px rgba(129, 212, 250, 0.8)',
                        '0 0 20px rgba(129, 212, 250, 0.5)',
                      ]
                    : '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10">{item.icon}</span>
                
                {/* Glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 glass px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium shadow-lg"
                >
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-white/70 border-b-4 border-b-transparent" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.aside>
  )
}

