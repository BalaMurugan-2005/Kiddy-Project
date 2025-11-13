import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import ChatArea from '../components/ChatArea'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'
import { motion } from 'framer-motion'

export default function Chat() {
  const navigate = useNavigate()
  const [dreamMode, setDreamMode] = useState(false)
  const [activeModule, setActiveModule] = useState('create')
  const [openPanel, setOpenPanel] = useState<string | null>(null)
  const [injectedPrompt, setInjectedPrompt] = useState<string>('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Dashboard', emoji: '🏠' },
    { path: '/chat', label: 'Chat', emoji: '💬' },
    { path: '/story-cards', label: 'Story Cards', emoji: '🃏' },
    { path: '/stories', label: 'Stories', emoji: '📖' },
    { path: '/games', label: 'Games', emoji: '🎮' },
    { path: '/studio', label: 'Dream Studio', emoji: '🎬' },
    { path: '/voice', label: 'Voice Mode', emoji: '🎤' },
    { path: '/settings', label: 'Settings', emoji: '⚙️' },
    { path: '/about', label: 'About', emoji: 'ℹ️' },
  ]

  useEffect(() => {
    if (dreamMode) {
      document.body.classList.add('dream-mode')
    } else {
      document.body.classList.remove('dream-mode')
    }
  }, [dreamMode])

  // Update background gradient based on open panel
  useEffect(() => {
    const gradients: Record<string, string> = {
      create: 'linear-gradient(135deg, #F9FAFB 0%, #E3F2FD 50%, #BBDEFB 100%)',
      stories: 'linear-gradient(135deg, #F9FAFB 0%, #FCE4EC 50%, #F8BBD0 100%)',
      studio: 'linear-gradient(135deg, #F9FAFB 0%, #FFF9C4 50%, #FFE082 100%)',
      games: 'linear-gradient(135deg, #F9FAFB 0%, #E1BEE7 50%, #CE93D8 100%)',
      community: 'linear-gradient(135deg, #F9FAFB 0%, #C8E6C9 50%, #A5D6A7 100%)',
      settings: 'linear-gradient(135deg, #F9FAFB 0%, #E0E0E0 50%, #BDBDBD 100%)',
    }

    const gradient = openPanel ? gradients[openPanel] : 'linear-gradient(135deg, #F9FAFB 0%, #E3F2FD 50%, #FCE4EC 100%)'
    document.body.style.background = gradient

    return () => {
      if (!dreamMode) {
        document.body.style.background = ''
      }
    }
  }, [openPanel, dreamMode])

  const handleGamePrompt = (prompt: string) => {
    setInjectedPrompt(prompt)
  }

  const handlePromptInjected = () => {
    setTimeout(() => setInjectedPrompt(''), 100)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <SparkleCursor />
      
      {/* Hamburger Menu */}
      <div className="relative z-20">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 left-6 z-50 p-3 rounded-full glass shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-blue/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <motion.span
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
              className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded"
            />
            <motion.span
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded"
            />
            <motion.span
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
              className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded"
            />
          </div>
        </motion.button>

        {/* Sidebar Menu */}
        <motion.div
          initial={false}
          animate={{ x: isMenuOpen ? 0 : -300 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 h-full w-80 max-w-[85vw] glass shadow-2xl z-40 p-6 overflow-y-auto"
        >
          <div className="mt-20 space-y-2">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center"
            >
              🌟 Kiddy AI Menu 🌟
            </motion.h2>
            {menuItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full text-left p-4 rounded-xl glass hover:bg-white/50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-sky-blue/50 flex items-center space-x-4 transition-all duration-200"
                whileHover={{ 
                  scale: 1.02, 
                  x: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring", 
                  stiffness: 200 
                }}
              >
                <motion.span 
                  className="text-2xl"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.emoji}
                </motion.span>
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Fun Footer for Kids */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 rounded-xl bg-gradient-to-r from-sky-blue/20 to-pink/20 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              🎉 Let's chat and have fun! 🎉
            </p>
          </motion.div>
        </motion.div>

        {/* Overlay */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-30 md:bg-black/10"
          />
        )}
      </div>

      {/* Chat Content - Fixed Alignment */}
      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar with proper spacing */}
        <div className="relative">
          <LeftSidebar 
            activeModule={activeModule} 
            setActiveModule={setActiveModule}
            dreamMode={dreamMode}
            onPanelOpen={setOpenPanel}
            onGamePrompt={handleGamePrompt}
            onNavigate={handleNavigation}
          />
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0"> {/* Added min-w-0 to prevent overflow */}
          <Header dreamMode={dreamMode} setDreamMode={setDreamMode} />
          <div className="flex-1 overflow-hidden"> {/* Added overflow-hidden container */}
            <ChatArea 
              activeModule={activeModule} 
              dreamMode={dreamMode}
              injectedPrompt={injectedPrompt}
              onPromptInjected={handlePromptInjected}
            />
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="relative">
          <RightSidebar dreamMode={dreamMode} />
        </div>
      </div>
    </main>
  )
}