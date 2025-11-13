import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'
import { useState } from 'react'

const stories = [
  { id: 1, title: 'Space Adventure', emoji: '🚀', prompt: 'Tell me a story about a space adventure' },
  { id: 2, title: 'Magic Forest', emoji: '🌲', prompt: 'Create a story about a magic forest' },
  { id: 3, title: 'Ocean Quest', emoji: '🌊', prompt: 'Tell me a story about an ocean quest' },
  { id: 4, title: 'Dragon Kingdom', emoji: '🐉', prompt: 'Create a story about a dragon kingdom' },
  { id: 5, title: 'Fairy Tale', emoji: '🧚', prompt: 'Tell me a fairy tale story' },
  { id: 6, title: 'Superhero', emoji: '🦸', prompt: 'Create a superhero adventure story' },
]

export default function Stories() {
  const navigate = useNavigate()
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

  const handleStorySelect = (prompt: string) => {
    navigate('/chat', { state: { injectedPrompt: prompt } })
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
              🎉 Let's explore amazing stories! 🎉
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

      {/* Stories Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to Dashboard"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent"
        >
          Choose Your Story 📖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto"
        >
          Pick your favorite story and let the adventure begin! Each story will start a magical chat with our AI friend! ✨
        </motion.p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => handleStorySelect(story.prompt)}
            >
              <div className="text-6xl mb-4 text-center">{story.emoji}</div>
              <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
                {story.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}