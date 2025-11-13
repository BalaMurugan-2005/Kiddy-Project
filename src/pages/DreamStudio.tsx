import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

export default function DreamStudio() {
  const navigate = useNavigate()

  const studioOptions = [
    { id: 1, title: 'Create Animation', emoji: '🎬', prompt: 'Create an animation about' },
    { id: 2, title: 'Design Character', emoji: '👤', prompt: 'Design a character for' },
    { id: 3, title: 'Build Scene', emoji: '🎨', prompt: 'Build a scene about' },
  ]

  const handleOptionClick = (prompt: string) => {
    navigate('/chat', { state: { injectedPrompt: prompt } })
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <SparkleCursor />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Back Button - Updated to go to Dashboard */}
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

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
          Dream Studio 🎬
        </h1>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {studioOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl text-center"
              onClick={() => handleOptionClick(option.prompt)}
            >
              <div className="text-6xl mb-4">{option.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {option.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}