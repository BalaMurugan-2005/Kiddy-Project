import { useEffect, useState } from 'react'

export default function SparkleCursor() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only create sparkles when hovering over interactive elements
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"]') || target.closest('button, a')) {
        const sparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        }
        setSparkles((prev) => [...prev, sparkle])

        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id))
        }, 600)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="cursor-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        />
      ))}
    </>
  )
}

