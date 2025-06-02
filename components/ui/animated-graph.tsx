"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"



export default function AnimatedGraph() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 0.5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Actualizar el cálculo de efficiency y cost en el componente principal
  const efficiency = calculateValue(progress, 20, 103)
  const cost = calculateValue(progress, 0, -67, true)

  // Modificar la posición de los puntos para que estén por encima de las líneas
  const efficiencyDotPosition = {
    x: (progress / 100) * 70 + 15,
    y: 100 - ((efficiency / 103) * 60 + 20) - 2, // -2 para posicionar ligeramente por encima
  }

  const costDotPosition = {
    x: (progress / 100) * 70 + 15,
    y: 100 - ((Math.abs(cost) / 67) * 40 + 40) - 2, // -2 para posicionar ligeramente por encima
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-50 aspect-[16/7] rounded-3xl relative overflow-hidden" >
        {/* Efficiency line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d={generatePath(progress, true)}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 10 }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {/* Cost line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d={generatePath(progress, false)}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 10 }}
            transition={{ duration: 0.1 }}
          />
        </svg>

        {/* Efficiency dot and label */}
        <motion.div
          className="absolute w-4 h-4 bg-white/30 rounded-full shadow-lg flex items-center justify-center"
          style={{
            left: `${efficiencyDotPosition.x}%`,
            top: `${efficiencyDotPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-2 h-2 bg-emerald-500/50 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute px-1 py-1 bg-transparent backdrop-blur-sm rounded-md border border-white text-white text-[10px] font-light"
          style={{
            left: `${Math.min(efficiencyDotPosition.x, 70)}%`,
            top: `${Math.max(efficiencyDotPosition.y - 15, 10)}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
         Eficiencia +{efficiency.toFixed(0)}%
        </motion.div>

        {/* Cost dot and label */}
        <motion.div
          className="absolute w-4 h-4 bg-white/30 rounded-full shadow-lg flex items-center justify-center"
          style={{
            left: `${costDotPosition.x}%`,
            top: `${costDotPosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-2 h-2 bg-red-500/80 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute px-1 py-1 bg-transparent backdrop-blur-sm rounded-md border border-white text-white text-[10px] font-light"
          style={{
            left: `${Math.min(costDotPosition.x, 70)}%`,
            top: `${Math.min(costDotPosition.y + 15, 90)}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          Costo {cost.toFixed(0)}%
        </motion.div>
      </div>
    </div>
  )
}

// Modificar la función generatePath para crear diferentes trayectorias
function generatePath(progress: number, isEfficiency: boolean) {
  const points = []
  const maxPoints = 100
  const currentPoints = Math.floor((progress / 100) * maxPoints)

  for (let i = 0; i <= currentPoints; i++) {
    const x = (i / maxPoints) * 70 + 15 // 15% to 85% horizontal space

    let y
    if (isEfficiency) {
      // Efficiency curve - starts low, increases over time
      const efficiencyValue = calculateValue((i / maxPoints) * 100, 20, 103)
      y = 100 - ((efficiencyValue / 103) * 60 + 20) // 20% to 80% vertical space
    } else {
      // Cost curve - starts high, decreases more dramatically after midpoint
      const costValue = calculateValue((i / maxPoints) * 100, 0, -67, true)
      y = 100 - ((Math.abs(costValue) / 67) * 40 + 40) // 40% to 80% vertical space
    }

    points.push(`${x},${y}`)
  }

  return `M ${points.join(" L ")}`
}

// Modificar la función calculateValue para crear diferentes curvas para eficiencia y costo
function calculateValue(progress: number, min: number, max: number, isCost = false) {
  // Create different curves for efficiency and cost
  const normalized = progress / 100

  if (isCost) {
    // Cost starts high and begins to drop more dramatically after the midpoint
    if (normalized < 0.5) {
      // First half - cost stays relatively high
      return min + (0.1 + normalized * 0.3) * (max - min)
    } else {
      // Second half - cost drops more dramatically
      const factor = (normalized - 0.5) * 2 // 0 to 1 in second half
      return min + (0.4 - 0.4 * factor * factor) * (max - min)
    }
  } else {
    // Efficiency starts low and gradually increases
    const curve =
      normalized < 0.3
        ? normalized * 0.8 // Slower at start
        : 0.24 + Math.pow(normalized - 0.3, 0.8) * 0.76 // Faster after 30%

    return min + curve * (max - min)
  }
}
