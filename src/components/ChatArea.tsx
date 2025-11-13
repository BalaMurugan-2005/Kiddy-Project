import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface ChatAreaProps {
  activeModule: string
  dreamMode: boolean
  injectedPrompt?: string
  onPromptInjected?: () => void
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatArea({ activeModule, dreamMode, injectedPrompt, onPromptInjected }: ChatAreaProps) {
  const location = useLocation()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Handle injected prompts (from game buttons or navigation state)
  useEffect(() => {
    const navPrompt = (location.state as any)?.injectedPrompt
    const prompt = injectedPrompt || navPrompt
    if (prompt) {
      setInput(prompt)
      inputRef.current?.focus()
      onPromptInjected?.()
    }
  }, [injectedPrompt, location.state, onPromptInjected])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput, module: activeModule }),
      })

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || `I love your idea about "${currentInput}"! Let me create something magical for you...`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback to mock response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `I love your idea about "${currentInput}"! Let me create something magical for you...`,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => {
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-2 md:px-4 pb-20 md:pb-6">
      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6 md:py-8"
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
          Kiddy AI ✨
        </h1>
        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
          Your creative AI companion
        </p>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} dreamMode={dreamMode} />
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative"
      >
        <div
          className={`
            glass rounded-2xl p-3 md:p-4 flex items-end gap-2 md:gap-3
            ${dreamMode ? 'ring-2 ring-neon-cyan/50' : 'ring-2 ring-sky-blue/30'}
            transition-all duration-300
          `}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your idea..."
            className="flex-1 bg-transparent border-none outline-none resize-none text-base md:text-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-sky-blue/50 rounded-lg px-2 py-1"
            rows={1}
            style={{ minHeight: '32px', maxHeight: '120px' }}
            aria-label="Chat input"
          />
          <motion.button
            onClick={handleVoiceInput}
            disabled={isRecording}
            className={`
              w-10 h-10 md:w-12 md:h-12 rounded-full
              flex items-center justify-center
              text-xl md:text-2xl
              focus:outline-none focus:ring-4 focus:ring-neon-cyan
              ${isRecording 
                ? 'bg-gradient-to-br from-red-400 to-red-600 text-white' 
                : 'glass hover:bg-white/50'
              }
              transition-colors
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
          >
            {isRecording ? '🔴' : '🎤'}
          </motion.button>
          <motion.button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`
              w-10 h-10 md:w-12 md:h-12 rounded-full
              bg-gradient-to-br from-sky-blue to-blue-500
              flex items-center justify-center
              text-white text-xl md:text-2xl
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-4 focus:ring-neon-cyan
            `}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Send message"
          >
            🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
