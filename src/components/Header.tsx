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
      className="glass rounded-2xl m-4 p-4 flex items-center justify-between"
    >
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-blue to-pink bg-clip-text text-transparent">
              Kiddy AI Chat 💬
        </h1>
      </motion.div>

      <div className="flex items-center gap-4">
        {/* Dream Mode Toggle Button */}
        <motion.button
          onClick={() => setDreamMode(!dreamMode)}
          className={`px-6 py-3 rounded-full font-bold shadow-lg transition-all ${
            dreamMode 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : 'bg-gradient-to-r from-sky-blue to-blue-500 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={dreamMode ? 'Disable Dream Mode' : 'Enable Dream Mode'}
        >
          {dreamMode ? '🌙 Dream Mode' : '☀️ Day Mode'}
        </motion.button>

        {/* User Avatar */}
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