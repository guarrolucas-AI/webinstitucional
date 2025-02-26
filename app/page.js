"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function UnderConstruction() {
  const [text, setText] = useState("")
  const fullText = "Web en Construcción"
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let index = 0
    let direction = 1
    let timer

    const typeText = () => {
      if (direction === 1) {
        if (index <= fullText.length) {
          setText(fullText.slice(0, index))
          index++
        } else {
          direction = -1
          timer = setTimeout(typeText, 2000) // Wait 2 seconds before starting to erase
          return
        }
      } else {
        if (index >= 0) {
          setText(fullText.slice(0, index))
          index--
        } else {
          direction = 1
          timer = setTimeout(typeText, 1000) // Wait 1 second before starting to type again
          return
        }
      }
      timer = setTimeout(typeText, 150) // Slower typing speed (150ms per character)
    }

    typeText()

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 5000) // Toggle visibility every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const breathingAnimation = {
    opacity: [0.1, 1, 0.2],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E3320] blur-[120px] opacity-30" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with breathing effect */}
        <motion.div animate={breathingAnimation} className="mb-8 relative w-[120px] h-[120px]">
          <Image src="/wikinbound-logo.png" alt="Logo" layout="fill" objectFit="contain" className="rounded-2xl" />
        </motion.div>

        {/* Construction text with typing and fade effect */}
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#2A4D2E] via-[#4CAF50] to-[#81C784] text-transparent bg-clip-text"
            animate={{ opacity: isVisible ? 1 : 0.2 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            {text}
          </motion.h1>
          <motion.p
            className="text-[#6B7280] text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Próximamente
          </motion.p>
        </div>
      </div>
    </div>
  )
}

