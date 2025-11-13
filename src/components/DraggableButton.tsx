import { motion, useMotionValue } from 'framer-motion'
import { useState, useEffect } from 'react'

interface DraggableButtonProps {
  children: React.ReactNode
  initialX?: number
  initialY?: number
  className?: string
  onDragEnd?: (x: number, y: number) => void
}

export default function DraggableButton({ 
  children, 
  initialX = 0, 
  initialY = 0,
  className = '',
  onDragEnd 
}: DraggableButtonProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleDragEnd = () => {
    const newX = x.get()
    const newY = y.get()
    setPosition({ x: position.x + newX, y: position.y + newY })
    x.set(0)
    y.set(0)
    onDragEnd?.(position.x + newX, position.y + newY)
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
      style={{ x, y, position: 'relative' }}
      onDragEnd={handleDragEnd}
      className={className}
    >
      {children}
    </motion.div>
  )
}

