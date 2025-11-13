'use client'

import { motion } from 'framer-motion'

interface HeaderProps {
  dreamMode: boolean
  setDreamMode: (mode: boolean) => void
}

export default function Header({ dreamMode, setDreamMode }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass px-6 py-4 flex items-center justify-between"
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-2xl font-bold bg-gradient-to-r from-sky-blue via-pink to-soft-yellow bg-clip-text text-transparent">
          Kiddy Universe
        </span>
        <span className="text-xl">✨</span>
      </motion.div>

      <div className="flex items-center gap-4">
        <motion.button
          onClick={() => setDreamMode(!dreamMode)}
          className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-white/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {dreamMode ? '☀️ Light Mode' : '🌙 Dream Mode'}
        </motion.button>

        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-blue to-pink flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-white text-lg">👤</span>
        </motion.div>
      </div>
    </motion.header>
  )
}

