import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

export default function Home() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { path: '/chat', label: 'Chat', emoji: '💬' },
    { path: '/story-cards', label: 'Story Cards', emoji: '🃏' },
    { path: '/stories', label: 'Stories', emoji: '📖' },
    { path: '/games', label: 'Games', emoji: '🎮' },
    { path: '/studio', label: 'Dream Studio', emoji: '🎬' },
    { path: '/voice', label: 'Voice Mode', emoji: '🎤' },
    { path: '/community', label: 'Community', emoji: '👥' },
    { path: '/settings', label: 'Settings', emoji: '⚙️' },
    { path: '/about', label: 'About', emoji: 'ℹ️' },
  ]

  const quickActions = [
    { path: '/chat', label: 'Start Chatting', emoji: '🚀', description: 'Begin your AI adventure' },
    { path: '/story-cards', label: 'Story Cards', emoji: '🃏', description: 'Quick story starters' },
    { path: '/games', label: 'Play Games', emoji: '🎯', description: 'Fun interactive games' },
  ]

  const featuredStoryCards = [
    { 
      id: 1, 
      title: 'Space Adventure', 
      emoji: '🚀', 
      description: 'Journey through the stars and discover new planets',
      prompt: 'Tell me a story about a space adventure',
      color: 'from-blue-400 to-purple-500'
    },
    { 
      id: 2, 
      title: 'Magic Forest', 
      emoji: '🌲', 
      description: 'Explore enchanted forests with magical creatures',
      prompt: 'Create a story about a magic forest',
      color: 'from-green-400 to-emerald-500'
    },
    { 
      id: 3, 
      title: 'Ocean Quest', 
      emoji: '🌊', 
      description: 'Dive deep into underwater kingdoms and mysteries',
      prompt: 'Tell me a story about an ocean quest',
      color: 'from-cyan-400 to-blue-500'
    },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  const handleStorySelect = (storyId: number) => {
    navigate(`/story/${storyId}`) // Changed to navigate to story detail page
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
              🎉 Let's have fun learning! 🎉
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

      {/* Dashboard Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
              Kiddy AI ✨
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Your creative AI companion for stories, adventures, and dreams
            </p>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl text-center"
                onClick={() => handleNavigation(action.path)}
              >
                <div className="text-5xl mb-4">{action.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {action.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {action.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Featured Story Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-blue to-pink bg-clip-text text-transparent">
                Featured Story Cards 🃏
              </h2>
              <motion.button
                onClick={() => navigate('/story-cards')}
                className="px-6 py-3 rounded-full glass text-sm font-medium hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View All Story Cards"
              >
                <span>View All Cards</span>
                <span>→</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredStoryCards.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="glass rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
                  style={{ borderLeftColor: 'var(--sky-blue)' }}
                  onClick={() => handleStorySelect(story.id)} // Changed to use story ID
                >
                  <div className="flex items-start space-x-4">
                    <div className={`text-4xl p-3 rounded-2xl bg-gradient-to-br ${story.color} text-white`}>
                      {story.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {story.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      Read Full Story
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-sky-blue to-pink bg-clip-text text-transparent">
              What You Can Do 🎨
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { emoji: '🤖', title: 'AI Chat', desc: 'Talk with friendly AI' },
                { emoji: '🃏', title: 'Story Cards', desc: 'Quick story starters' },
                { emoji: '📖', title: 'Stories', desc: 'Create magical tales' },
                { emoji: '🎮', title: 'Games', desc: 'Play fun adventures' },
                { emoji: '🎬', title: 'Studio', desc: 'Make animations' },
                { emoji: '🎤', title: 'Voice', desc: 'Speak your ideas' },
                { emoji: '👥', title: 'Community', desc: 'Share creations' },
                { emoji: '⚙️', title: 'Settings', desc: 'Customize experience' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4"
                >
                  <div className="text-4xl mb-3">{feature.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}