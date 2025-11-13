import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import DraggableButton from './DraggableButton'

interface LeftSidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
  dreamMode: boolean
  onPanelOpen?: (panelId: string | null) => void
  onGamePrompt?: (prompt: string) => void
  onNavigate?: (path: string) => void
}

const leftNavItems = [
  { id: 'create', icon: '🎨', label: 'Create', color: 'from-sky-blue to-blue-400', prompt: 'Create a magical story about...' },
  { id: 'stories', icon: '📖', label: 'Stories', color: 'from-pink to-rose-400', prompt: 'Tell me a story about...' },
  { id: 'studio', icon: '🎬', label: 'Dream Studio', color: 'from-soft-yellow to-yellow-400', prompt: 'Let\'s create an animation about...' },
]

const rightNavItems = [
  { id: 'games', icon: '🎮', label: 'Games', color: 'from-purple-400 to-pink-400', isGame: true, prompt: 'Let\'s play a fun game! Create a story where...' },
  { id: 'community', icon: '🌈', label: 'Community', color: 'from-green-400 to-emerald-400', prompt: 'Show me community stories about...' },
  { id: 'settings', icon: '⚙️', label: 'Settings', color: 'from-gray-400 to-gray-600', prompt: null },
]

const gamePrompts = [
  'Create an adventure story where I\'m a brave explorer!',
  'Make a story about magical animals in a forest!',
  'Tell me a space adventure with aliens and planets!',
  'Create a story about underwater kingdoms!',
]

export default function LeftSidebar({ activeModule, setActiveModule, dreamMode, onPanelOpen, onGamePrompt, onNavigate }: LeftSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [openPanel, setOpenPanel] = useState<string | null>(null)

  const handleButtonClick = (item: typeof leftNavItems[0] | typeof rightNavItems[0]) => {
    // Navigate to specific pages
    if (item.id === 'stories' && onNavigate) {
      onNavigate('/stories')
      return
    }
    if (item.id === 'studio' && onNavigate) {
      onNavigate('/studio')
      return
    }
    if (item.id === 'games' && onNavigate) {
      onNavigate('/games')
      return
    }
    if (item.id === 'settings' && onNavigate) {
      onNavigate('/settings')
      return
    }
    
    if (item.isGame && onGamePrompt) {
      const randomPrompt = gamePrompts[Math.floor(Math.random() * gamePrompts.length)]
      onGamePrompt(randomPrompt)
      return
    }

    if (item.prompt && onGamePrompt) {
      onGamePrompt(item.prompt)
      return
    }

    if (openPanel === item.id) {
      setOpenPanel(null)
      onPanelOpen?.(null)
    } else {
      setOpenPanel(item.id)
      setActiveModule(item.id)
      onPanelOpen?.(item.id)
    }
  }

  return (
    <>
      {/* Left Side Buttons */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block"
      >
        <div className="flex flex-col gap-4">
          {leftNavItems.map((item, index) => {
            const isActive = openPanel === item.id
            const isHovered = hoveredItem === item.id

            return (
            <DraggableButton
              key={item.id}
              initialX={0}
              initialY={0}
              className="relative group"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.button
                  onClick={() => handleButtonClick(item)}
                  className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-full
                    bg-gradient-to-br ${item.color}
                    flex items-center justify-center
                    text-xl md:text-2xl
                    shadow-lg
                    relative overflow-hidden
                    focus:outline-none focus:ring-4 focus:ring-neon-cyan focus:ring-offset-2
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
                  aria-label={item.label}
                >
                  <span className="relative z-10 text-2xl md:text-3xl">{item.icon}</span>
                  
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

                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 glass px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium shadow-lg z-50"
                  >
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-white/70 border-b-4 border-b-transparent" />
                  </motion.div>
                )}
              </motion.div>
            </DraggableButton>
            )
          })}
        </div>
      </motion.aside>

      {/* Right Side Buttons */}
      <motion.aside
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block"
      >
        <div className="flex flex-col gap-4">
          {rightNavItems.map((item, index) => {
            const isActive = openPanel === item.id
            const isHovered = hoveredItem === item.id

            return (
            <DraggableButton
              key={item.id}
              initialX={0}
              initialY={0}
              className="relative group"
            >
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.button
                  onClick={() => handleButtonClick(item)}
                  className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-full
                    bg-gradient-to-br ${item.color}
                    flex items-center justify-center
                    text-xl md:text-2xl
                    shadow-lg
                    relative overflow-hidden
                    focus:outline-none focus:ring-4 focus:ring-neon-cyan focus:ring-offset-2
                    ${isActive ? 'ring-4 ring-offset-2 ring-offset-white ring-neon-cyan' : ''}
                    ${dreamMode ? 'ring-offset-gray-900' : ''}
                  `}
                  whileHover={{ scale: 1.15, rotate: -5 }}
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
                  aria-label={item.label}
                >
                  <span className="relative z-10 text-2xl md:text-3xl">{item.icon}</span>
                  
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

                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full mr-4 top-1/2 -translate-y-1/2 glass px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium shadow-lg z-50"
                  >
                    {item.label}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-white/70 border-b-4 border-b-transparent" />
                  </motion.div>
                )}
              </motion.div>
            </DraggableButton>
            )
          })}
        </div>
      </motion.aside>

      {/* Slide-in Panels */}
      <AnimatePresence>
        {openPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setOpenPanel(null)
                onPanelOpen?.(null)
              }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              key={openPanel}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 md:w-96 glass shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {[...leftNavItems, ...rightNavItems].find(item => item.id === openPanel)?.label}
                  </h2>
                  <motion.button
                    onClick={() => {
                      setOpenPanel(null)
                      onPanelOpen?.(null)
                    }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-xl hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close panel"
                  >
                    ×
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <p className="text-lg">
                    {openPanel === 'create' && 'Create amazing stories, animations, and adventures!'}
                    {openPanel === 'stories' && 'Explore a library of magical stories and adventures!'}
                    {openPanel === 'studio' && 'Bring your dreams to life with our animation studio!'}
                    {openPanel === 'games' && 'Play fun interactive games and adventures!'}
                    {openPanel === 'community' && 'Share and discover creations from the community!'}
                    {openPanel === 'settings' && 'Customize your Kiddy Universe experience!'}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Buttons */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-2 z-30 md:hidden px-4">
        <div className="flex gap-2 flex-wrap justify-center max-w-md">
          {[...leftNavItems, ...rightNavItems].slice(0, 4).map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleButtonClick(item)}
              className={`
                w-12 h-12 rounded-full
                bg-gradient-to-br ${item.color}
                flex items-center justify-center
                text-xl shadow-lg
                focus:outline-none focus:ring-4 focus:ring-neon-cyan
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={item.label}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  )
}
