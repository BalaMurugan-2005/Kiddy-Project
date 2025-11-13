'use client'

import { motion } from 'framer-motion'

interface OutputCardProps {
  output: {
    id: string
    title: string
    summary: string
    thumbnail: string
  }
  dreamMode: boolean
}

export default function OutputCard({ output, dreamMode }: OutputCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="glass rounded-2xl p-6 shadow-xl overflow-hidden"
    >
      <div className="flex gap-4">
        <motion.div
          className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={output.thumbnail}
            alt={output.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            {output.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {output.summary}
          </p>

          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-blue to-blue-500 text-white text-sm font-medium shadow-md"
            >
              🎬 Create Scene
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink to-rose-500 text-white text-sm font-medium shadow-md"
            >
              📖 Expand Story
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-soft-yellow to-yellow-500 text-white text-sm font-medium shadow-md"
            >
              🔊 Voice It
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

