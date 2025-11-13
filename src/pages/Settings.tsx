import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

export default function Settings() {
  const navigate = useNavigate()
  const [dreamMode, setDreamMode] = useState(false)

  useEffect(() => {
    if (dreamMode) {
      document.body.classList.add('dream-mode')
    } else {
      document.body.classList.remove('dream-mode')
    }
  }, [dreamMode])

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
          Settings ⚙️
        </h1>

        <div className="max-w-2xl mx-auto glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Dream Mode</span>
            <motion.button
              onClick={() => setDreamMode(!dreamMode)}
              className={`px-4 py-2 rounded-full ${dreamMode ? 'bg-neon-cyan' : 'bg-gray-300'} text-white`}
              whileTap={{ scale: 0.95 }}
            >
              {dreamMode ? 'ON' : 'OFF'}
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  )
}

