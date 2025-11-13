import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

const games = [
  { 
    id: 1, 
    title: 'Adventure Explorer', 
    emoji: '🚀', 
    description: 'Become a brave explorer and discover hidden treasures!',
    color: 'from-blue-400 to-purple-500',
    category: 'Adventure'
  },
  { 
    id: 2, 
    title: 'Magic Animal Rescue', 
    emoji: '🌲', 
    description: 'Help magical animals in an enchanted forest with amazing graphics!',
    color: 'from-green-400 to-emerald-500',
    category: 'Adventure'
  },
  { 
    id: 3, 
    title: 'Space Mission', 
    emoji: '🛸', 
    description: 'Fly through space and destroy alien invaders!',
    color: 'from-cyan-400 to-blue-500',
    category: 'Space'
  },
  { 
    id: 4, 
    title: 'Underwater Quest', 
    emoji: '🌊', 
    description: 'Dive deep and solve ocean mysteries!',
    color: 'from-teal-400 to-cyan-500',
    category: 'Adventure'
  },
  { 
    id: 5, 
    title: 'Dragon Friendship', 
    emoji: '🐉', 
    description: 'Make friends with friendly dragons!',
    color: 'from-red-400 to-orange-500',
    category: 'Fantasy'
  },
  { 
    id: 6, 
    title: 'Superhero Training', 
    emoji: '🦸', 
    description: 'Train to become an amazing superhero!',
    color: 'from-yellow-400 to-red-500',
    category: 'Action'
  },
]

export default function Games() {
  const navigate = useNavigate()

  const handleGameSelect = (gameId: number) => {
    // For game ID 2 (Magic Animal Rescue), navigate to the special game page
    if (gameId === 2) {
      navigate('/magic-animal-rescue')
    } else {
      navigate(`/game/${gameId}`)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <SparkleCursor />
      
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

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
          Games 🎮
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl text-center"
              onClick={() => handleGameSelect(game.id)}
            >
              <div className={`text-6xl mb-4 p-4 rounded-2xl bg-gradient-to-br ${game.color} text-white`}>
                {game.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {game.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {game.description}
              </p>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                {game.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}