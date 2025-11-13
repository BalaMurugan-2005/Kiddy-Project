import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import SparkleCursor from '../components/SparkleCursor'

export default function Voice() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in your browser')
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => setIsRecording(true)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      navigate('/chat', { state: { injectedPrompt: transcript } })
      setIsRecording(false)
    }
    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)

    recognition.start()
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <SparkleCursor />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <motion.button
            onClick={() => navigate('/chat')}
            className="absolute top-4 left-4 px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-sky-blue/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to Chat"
          >
            ← Back to Chat
          </motion.button>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
            Voice Mode 🎤
          </h1>

          <motion.button
            onClick={handleVoiceInput}
            disabled={isRecording}
            className={`
              w-32 h-32 md:w-40 md:h-40 rounded-full
              flex items-center justify-center
              text-6xl md:text-7xl
              focus:outline-none focus:ring-4 focus:ring-neon-cyan
              ${isRecording 
                ? 'bg-gradient-to-br from-red-400 to-red-600' 
                : 'bg-gradient-to-br from-sky-blue to-blue-500'
              }
              shadow-2xl hover:shadow-3xl transition-all
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
            aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
          >
            {isRecording ? '🔴' : '🎤'}
          </motion.button>

          <p className="mt-8 text-lg text-gray-600 dark:text-gray-300">
            {isRecording ? 'Listening... Speak now!' : 'Click the microphone to start speaking'}
          </p>
        </div>
      </div>
    </main>
  )
}

