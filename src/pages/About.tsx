import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

export default function About() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <SparkleCursor />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        <motion.button
          onClick={() => navigate('/chat')}
          className="mb-6 px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-blue/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to Chat"
        >
          ← Back to Chat
        </motion.button>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
          About Kiddy AI ℹ️
        </h1>

        <div className="max-w-3xl mx-auto glass rounded-2xl p-6 md:p-8 space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Kiddy AI is a creative AI platform designed for children to explore, create, and learn through interactive stories, games, and adventures.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our mission is to spark imagination and creativity in young minds through the power of artificial intelligence.
          </p>
        </div>
      </div>
    </main>
  )
}

