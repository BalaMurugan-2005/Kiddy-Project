import { motion } from 'framer-motion'

interface OutputCardProps {
  output: {
    id: string
    title: string
    summary: string
    thumbnail: string
    subject: string
  }
  dreamMode: boolean
}

export default function OutputCard({ output }: OutputCardProps) {
  const subjectColors: Record<string, string> = {
    'Adventure': 'bg-blue-500',
    'Fantasy': 'bg-purple-500',
    'Science': 'bg-green-500',
    'Nature': 'bg-emerald-500',
    'Space': 'bg-indigo-500',
    'Ocean': 'bg-cyan-500',
  }

  const subjectColor = subjectColors[output.subject] || 'bg-gray-500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="glass rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        {/* Thumbnail */}
        <motion.div
          className="w-full md:w-48 h-32 md:h-40 rounded-xl overflow-hidden flex-shrink-0 relative group"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={output.thumbnail}
            alt={output.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subject Badge */}
          <div className={`absolute top-2 left-2 ${subjectColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
            {output.subject}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              {output.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {output.summary}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-sky-blue to-blue-500 text-white text-sm md:text-base font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all"
              aria-label="Create Scene"
            >
              🎬 Create Scene
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-pink to-rose-500 text-white text-sm md:text-base font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink/50 transition-all"
              aria-label="Expand Story"
            >
              📖 Expand Story
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-soft-yellow to-yellow-500 text-white text-sm md:text-base font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all"
              aria-label="Voice It"
            >
              🔊 Voice It
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
