import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'
import { useState } from 'react'

const storyCards = [
  { 
    id: 1, 
    title: 'Space Adventure', 
    emoji: '🚀', 
    description: 'Journey through the stars and discover new planets with friendly aliens!',
    prompt: 'Create a space adventure story where I explore new galaxies',
    color: 'from-blue-400 to-purple-500',
    category: 'Adventure',
    duration: '5-7 minutes',
    ageGroup: '5-8 years'
  },
  { 
    id: 2, 
    title: 'Magic Forest', 
    emoji: '🌲', 
    description: 'Explore enchanted forests with talking animals and magical creatures!',
    prompt: 'Tell me a story about a magic forest with friendly animals',
    color: 'from-green-400 to-emerald-500',
    category: 'Fantasy',
    duration: '4-6 minutes',
    ageGroup: '4-7 years'
  },
  { 
    id: 3, 
    title: 'Ocean Quest', 
    emoji: '🌊', 
    description: 'Dive deep into underwater kingdoms and solve ocean mysteries!',
    prompt: 'Create an underwater adventure with mermaids and sea creatures',
    color: 'from-cyan-400 to-blue-500',
    category: 'Adventure',
    duration: '6-8 minutes',
    ageGroup: '6-9 years'
  },
  { 
    id: 4, 
    title: 'Dragon Kingdom', 
    emoji: '🐉', 
    description: 'Meet friendly dragons and explore their magical crystal caves!',
    prompt: 'Tell me a story about a friendly dragon kingdom',
    color: 'from-red-400 to-orange-500',
    category: 'Fantasy',
    duration: '5-7 minutes',
    ageGroup: '5-8 years'
  },
  { 
    id: 5, 
    title: 'Fairy Tale', 
    emoji: '🧚', 
    description: 'Classic fairy tales with princesses, castles, and magical spells!',
    prompt: 'Create a fairy tale with a happy ending',
    color: 'from-pink-400 to-purple-500',
    category: 'Fantasy',
    duration: '4-6 minutes',
    ageGroup: '4-7 years'
  },
  { 
    id: 6, 
    title: 'Superhero Mission', 
    emoji: '🦸', 
    description: 'Become a superhero and save the city from funny villains!',
    prompt: 'Create a superhero story where I have special powers',
    color: 'from-yellow-400 to-red-500',
    category: 'Action',
    duration: '5-7 minutes',
    ageGroup: '5-9 years'
  },
  { 
    id: 7, 
    title: 'Dinosaur Land', 
    emoji: '🦕', 
    description: 'Travel back in time and meet friendly dinosaurs!',
    prompt: 'Tell me a story about meeting friendly dinosaurs',
    color: 'from-green-500 to-yellow-500',
    category: 'Adventure',
    duration: '6-8 minutes',
    ageGroup: '6-10 years'
  },
  { 
    id: 8, 
    title: 'Candy World', 
    emoji: '🍭', 
    description: 'Explore a world made of candy, chocolate, and sweet treats!',
    prompt: 'Create a story about a magical candy land',
    color: 'from-pink-500 to-red-400',
    category: 'Fantasy',
    duration: '4-5 minutes',
    ageGroup: '3-6 years'
  },
]

export default function StoryCards() {
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

  const handleStorySelect = (storyId: number) => {
    navigate(`/story/${storyId}`)
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

      {/* Story Cards Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Back Button - Properly aligned */}
        <div className="max-w-7xl mx-auto">
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
            Story Cards 🃏
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto"
          >
            Choose your favorite story card to read the full magical adventure! 
            Each story is specially created for kids! ✨
          </motion.p>

          {/* Story Cards Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {storyCards.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateY: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="glass rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 relative overflow-hidden group"
                  style={{ borderLeftColor: 'var(--sky-blue)' }}
                  onClick={() => handleStorySelect(story.id)}
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                      {story.category}
                    </span>
                  </div>

                  {/* Emoji with Gradient Background */}
                  <div className={`text-5xl p-4 rounded-2xl bg-gradient-to-br ${story.color} text-white mb-4 text-center group-hover:scale-110 transition-transform duration-300`}>
                    {story.emoji}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-3">
                    {story.description}
                  </p>

                  {/* Story Details */}
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>⏱️ {story.duration}</span>
                    <span>👶 {story.ageGroup}</span>
                  </div>

                  {/* Click Indicator */}
                  <div className="flex justify-center">
                    <motion.span 
                      className="text-xs text-sky-blue dark:text-cyan-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      📖 Read Full Story!
                    </motion.span>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/10 to-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fun Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 p-6 glass rounded-2xl max-w-2xl mx-auto"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              🎊 <strong>So many stories to explore!</strong> 🎊<br />
              <span className="text-sm">Click any story to read the full adventure!</span>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}