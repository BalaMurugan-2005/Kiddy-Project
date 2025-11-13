import { motion } from 'framer-motion'
import { useState } from 'react'

interface RightSidebarProps {
  dreamMode: boolean
}

export default function RightSidebar({ dreamMode }: RightSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const recentCreations = [
    { id: 1, title: 'Space Adventure', type: 'Story', emoji: '🚀' },
    { id: 2, title: 'Magic Forest', type: 'Animation', emoji: '🌲' },
    { id: 3, title: 'Ocean Quest', type: 'Story', emoji: '🌊' },
  ]

  const tips = [
    'Try describing your character in detail!',
    'Use emojis to make your stories more fun!',
    'Combine multiple ideas for epic adventures!',
  ]

  return (
    <motion.aside
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={`fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block ${isOpen ? 'w-64' : 'w-12'}`}
    >
      <motion.div
        className="glass rounded-2xl p-4 h-[500px] overflow-y-auto"
        animate={{ width: isOpen ? 256 : 48 }}
      >
        {isOpen ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Info Panel</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ←
              </button>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>✨</span> Recent Creations
              </h4>
              <div className="space-y-2">
                {recentCreations.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="glass rounded-lg p-2 cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.type}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span>💡</span> Tips
              </h4>
              <div className="space-y-2">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="glass rounded-lg p-2 text-sm"
                  >
                    {tip}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              →
            </button>
          </div>
        )}
      </motion.div>
    </motion.aside>
  )
}

