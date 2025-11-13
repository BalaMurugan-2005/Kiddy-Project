import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

// Game data
const gamesData = {
  3: {
    id: 3,
    title: 'Space Mission',
    emoji: '🛸',
    description: 'Fly through space and destroy alien invaders!',
    color: 'from-cyan-400 to-blue-500',
    category: 'Space'
  }
}

export default function GameDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentGame, setCurrentGame] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [character, setCharacter] = useState({
    name: '',
    ship: '🚀'
  })

  // Game state
  const gameRef = useRef<HTMLDivElement>(null)
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 80 })
  const [enemies, setEnemies] = useState<Array<{id: number, x: number, y: number, type: string}>>([])
  const [bullets, setBullets] = useState<Array<{id: number, x: number, y: number}>>([])
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, speed: number}>>([])

  // Available spaceships
  const spaceships = [
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '🛸', name: 'UFO' },
    { emoji: '👾', name: 'Alien Ship' },
    { emoji: '🛰️', name: 'Satellite' }
  ]

  useEffect(() => {
    const game = id && id in gamesData ? gamesData[id as keyof typeof gamesData] : null
    setCurrentGame(game)
    setIsLoading(false)

    // Create background stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 2
    }))
    setStars(newStars)
  }, [id])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = setInterval(() => {
      // Move stars (background)
      setStars(stars => stars.map(star => ({
        ...star,
        y: star.y > 100 ? 0 : star.y + star.speed
      })))

      // Spawn enemies randomly
      if (Math.random() < 0.1) {
        const enemyTypes = ['👾', '🛸', '💀', '👽', '🤖']
        setEnemies(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
          type: enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
        }])
      }

      // Move enemies
      setEnemies(prev => prev.map(enemy => ({
        ...enemy,
        y: enemy.y + 2
      })).filter(enemy => enemy.y < 100))

      // Move bullets
      setBullets(prev => prev.map(bullet => ({
        ...bullet,
        y: bullet.y - 5
      })).filter(bullet => bullet.y > 0))

      // Check collisions
      enemies.forEach(enemy => {
        bullets.forEach(bullet => {
          const distance = Math.sqrt(
            Math.pow(enemy.x - bullet.x, 2) + Math.pow(enemy.y - bullet.y, 2)
          )
          if (distance < 10) {
            // Collision detected
            setEnemies(prev => prev.filter(e => e.id !== enemy.id))
            setBullets(prev => prev.filter(b => b.id !== bullet.id))
            setScore(prev => prev + 10)
          }
        })

        // Check if enemy reached player
        if (enemy.y > 85) {
          const distance = Math.sqrt(
            Math.pow(enemy.x - playerPosition.x, 2) + Math.pow(enemy.y - playerPosition.y, 2)
          )
          if (distance < 15) {
            setEnemies(prev => prev.filter(e => e.id !== enemy.id))
            setLives(prev => prev - 1)
          }
        }
      })

      // Check game over
      if (lives <= 0) {
        setGameOver(true)
      }

    }, 50)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, lives, playerPosition, enemies, bullets])

  // Handle keyboard controls
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowLeft':
          setPlayerPosition(prev => ({ ...prev, x: Math.max(10, prev.x - 10) }))
          break
        case 'ArrowRight':
          setPlayerPosition(prev => ({ ...prev, x: Math.min(90, prev.x + 10) }))
          break
        case ' ':
          shoot()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameStarted, gameOver])

  // Touch controls for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameStarted || gameOver) return
    
    const touch = e.touches[0]
    const gameRect = gameRef.current?.getBoundingClientRect()
    if (gameRect) {
      const x = ((touch.clientX - gameRect.left) / gameRect.width) * 100
      setPlayerPosition(prev => ({ ...prev, x: Math.max(5, Math.min(95, x)) }))
    }
  }

  const shoot = () => {
    setBullets(prev => [...prev, {
      id: Date.now(),
      x: playerPosition.x,
      y: playerPosition.y - 5
    }])
  }

  const handleCharacterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (character.name && character.ship) {
      setGameStarted(true)
    }
  }

  const restartGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setEnemies([])
    setBullets([])
    setPlayerPosition({ x: 50, y: 80 })
  }

  if (isLoading) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <SparkleCursor />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl"
          >
            🎮
          </motion.div>
        </div>
      </main>
    )
  }

  if (!currentGame) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <SparkleCursor />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Game Not Found</h1>
            <button 
              onClick={() => navigate('/games')}
              className="px-6 py-3 rounded-full glass hover:bg-white/50"
            >
              Back to Games
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (!gameStarted) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <BackgroundEffects />
        <SparkleCursor />
        
        <div className="relative z-10 min-h-screen px-4 py-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/games')}
            className="mb-6 px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to Games"
          >
            <span>←</span>
            <span>Back to Games</span>
          </motion.button>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className={`text-8xl p-8 rounded-3xl bg-gradient-to-br ${currentGame.color} text-white inline-block mb-6`}>
                {currentGame.emoji}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
                {currentGame.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {currentGame.description}
              </p>
            </motion.div>

            {/* Character Creation Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-center mb-6">Prepare for Launch! 🚀</h2>
              
              <form onSubmit={handleCharacterSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Space Pilot Name:
                  </label>
                  <input
                    type="text"
                    value={character.name}
                    onChange={(e) => setCharacter({...character, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl glass border-2 border-transparent focus:border-sky-blue focus:outline-none text-lg"
                    placeholder="Enter your pilot name..."
                    required
                  />
                </div>

                {/* Spaceship Selection */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose Your Spaceship:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {spaceships.map((ship) => (
                      <motion.button
                        key={ship.name}
                        type="button"
                        onClick={() => setCharacter({...character, ship: ship.emoji})}
                        className={`p-4 rounded-xl text-lg font-medium transition-all flex flex-col items-center ${
                          character.ship === ship.emoji
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                            : 'glass hover:bg-white/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-3xl mb-2">{ship.emoji}</span>
                        <span className="text-sm">{ship.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Game Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
                  <h3 className="font-bold mb-2">How to Play:</h3>
                  <ul className="text-sm space-y-1 text-left">
                    <li>← → Arrow Keys to move left/right</li>
                    <li>Spacebar to shoot lasers</li>
                    <li>Destroy aliens to earn points</li>
                    <li>Avoid getting hit by enemies!</li>
                    <li>You have 3 lives</li>
                  </ul>
                </div>

                {/* Start Game Button */}
                <motion.button
                  type="submit"
                  disabled={!character.name || !character.ship}
                  className={`w-full py-4 rounded-xl text-xl font-bold transition-all ${
                    character.name && character.ship
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={character.name && character.ship ? { scale: 1.02 } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  Launch Mission! 🚀
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundEffects />
      <SparkleCursor />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Game Header */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex justify-between items-center glass rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className={`text-3xl p-3 rounded-2xl bg-gradient-to-br ${currentGame.color} text-white`}>
                {currentGame.emoji}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{currentGame.title}</h1>
                <p className="text-gray-300 text-sm">Pilot: {character.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">Score: {score}</div>
              <div className="text-lg text-red-400">Lives: {'❤️'.repeat(lives)}</div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div 
          ref={gameRef}
          className="max-w-4xl mx-auto bg-gradient-to-b from-purple-900 to-black rounded-2xl border-2 border-cyan-500 relative overflow-hidden"
          style={{ height: '600px' }}
          onTouchMove={handleTouchMove}
          onClick={shoot}
        >
          {/* Background Stars */}
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                opacity: 0.7
              }}
            />
          ))}

          {/* Player Spaceship */}
          <motion.div
            className="absolute text-4xl cursor-pointer"
            style={{
              left: `${playerPosition.x}%`,
              top: `${playerPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {character.ship}
          </motion.div>

          {/* Bullets */}
          {bullets.map(bullet => (
            <div
              key={bullet.id}
              className="absolute text-xl"
              style={{
                left: `${bullet.x}%`,
                top: `${bullet.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              💥
            </div>
          ))}

          {/* Enemies */}
          {enemies.map(enemy => (
            <motion.div
              key={enemy.id}
              className="absolute text-3xl"
              style={{
                left: `${enemy.x}%`,
                top: `${enemy.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {enemy.type}
            </motion.div>
          ))}

          {/* Game Over Screen */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <div className="text-center glass rounded-2xl p-8 max-w-md">
                <div className="text-6xl mb-4">💥</div>
                <h2 className="text-3xl font-bold text-white mb-4">Mission Failed!</h2>
                <p className="text-xl text-gray-300 mb-2">Final Score: {score}</p>
                <p className="text-lg text-gray-400 mb-6">Great effort, {character.name}!</p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={restartGame}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Again 🔄
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/games')}
                    className="px-6 py-3 glass text-white rounded-xl font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    More Games 🎮
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Controls Help */}
          {!gameOver && (
            <div className="absolute bottom-4 left-4 glass rounded-xl p-3 text-white text-sm">
              <div>← → Move | Space: Shoot</div>
              <div>Tap to shoot (mobile)</div>
            </div>
          )}
        </div>

        {/* Mobile Shoot Button */}
        {!gameOver && (
          <div className="max-w-4xl mx-auto mt-4 text-center">
            <motion.button
              onClick={shoot}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl text-xl font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔥 SHOOT 🔥
            </motion.button>
          </div>
        )}
      </div>
    </main>
  )
}