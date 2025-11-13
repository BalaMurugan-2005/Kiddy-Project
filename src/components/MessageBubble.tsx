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
  // Function to render text with colors for AI messages
  const renderColoredText = (text: string) => {
    if (message.isUser) {
      return <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{text}</p>
    }
    
    // Split text and add colors to certain words/patterns
    const words = text.split(/(\s+)/)
    return (
      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
        {words.map((word, i) => {
          const lowerWord = word.toLowerCase().trim()
          if (lowerWord.includes('story') || lowerWord.includes('adventure')) {
            return <span key={i} className="text-blue-600 dark:text-blue-400 font-semibold">{word}</span>
          }
          if (lowerWord.includes('magic') || lowerWord.includes('magical')) {
            return <span key={i} className="text-purple-600 dark:text-purple-400 font-semibold">{word}</span>
          }
          if (lowerWord.includes('create') || lowerWord.includes('make')) {
            return <span key={i} className="text-pink-600 dark:text-pink-400 font-semibold">{word}</span>
          }
          if (lowerWord.includes('fun') || lowerWord.includes('exciting')) {
            return <span key={i} className="text-yellow-600 dark:text-yellow-400 font-semibold">{word}</span>
          }
          return <span key={i} className="text-gray-800 dark:text-gray-200">{word}</span>
        })}
      </p>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3
          ${message.isUser 
            ? 'bg-gradient-to-br from-sky-blue to-blue-400 text-white' 
            : 'glass bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200'
          }
          shadow-lg
        `}
      >
        {renderColoredText(message.text)}
      </div>
    </motion.div>
  )
}

