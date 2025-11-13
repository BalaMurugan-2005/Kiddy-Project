'use client'

import { motion } from 'framer-motion'

interface MessageBubbleProps {
  message: {
    id: string
    text: string
    isUser: boolean
    timestamp: Date
  }
  dreamMode: boolean
}

export default function MessageBubble({ message, dreamMode }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[70%] rounded-2xl px-4 py-3
          ${message.isUser 
            ? 'bg-gradient-to-br from-sky-blue to-blue-400 text-white' 
            : 'glass text-gray-800 dark:text-gray-200'
          }
          shadow-lg
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
      </div>
    </motion.div>
  )
}

