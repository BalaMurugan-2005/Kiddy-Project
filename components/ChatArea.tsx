'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageBubble from './MessageBubble'
import OutputCard from './OutputCard'
import TypingIndicator from './TypingIndicator'

interface ChatAreaProps {
  activeModule: string
  dreamMode: boolean
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface Output {
  id: string
  title: string
  summary: string
  thumbnail: string
}

export default function ChatArea({ activeModule, dreamMode }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [outputs, setOutputs] = useState<Output[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, outputs])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I love your idea about "${input}"! Let me create something magical for you...`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)

      // Generate output card
      const newOutput: Output = {
        id: Date.now().toString(),
        title: `Story: ${input.substring(0, 30)}...`,
        summary: `An amazing adventure based on your idea! This story features exciting characters and magical moments that will spark your imagination.`,
        thumbnail: `https://picsum.photos/300/200?random=${Date.now()}`,
      }
      setOutputs((prev) => [...prev, newOutput])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-2 md:px-4 pb-6">
      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
          Welcome to Kiddy Universe ✨
        </h1>
        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
          Light. Camera. Dream.
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

        {/* Output Cards */}
        <AnimatePresence>
          {outputs.map((output) => (
            <OutputCard key={output.id} output={output} dreamMode={dreamMode} />
          ))}
        </AnimatePresence>

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
            glass rounded-2xl p-4 flex items-end gap-3
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
            className="flex-1 bg-transparent border-none outline-none resize-none text-base placeholder-gray-400 dark:placeholder-gray-500"
            rows={1}
            style={{ minHeight: '24px', maxHeight: '120px' }}
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`
              w-10 h-10 rounded-full
              bg-gradient-to-br from-sky-blue to-blue-500
              flex items-center justify-center
              text-white text-xl
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

