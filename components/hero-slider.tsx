"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { theme } from "@/lib/theme"
import { portfolioItems } from "@/lib/data"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"
import Image from "next/image"

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const { language } = useLanguageContext()
  const t = translations[language]

  // Get random portfolio items for hero: 2 videos + 4 photos, no duplicates, random order each time
  const [items, setItems] = useState<typeof portfolioItems>([])

  useEffect(() => {
    // Separate videos and photos
    const videos = portfolioItems.filter((item) => item.type === "video")
    const photos = portfolioItems.filter((item) => item.type === "photo")

    // Shuffle arrays using Fisher-Yates algorithm
    const shuffle = <T,>(array: T[]): T[] => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    // Get random 2 videos and 4 photos
    const randomVideos = shuffle(videos).slice(0, Math.min(2, videos.length))
    const randomPhotos = shuffle(photos).slice(0, Math.min(4, photos.length))

    // Combine and shuffle again for random order
    const combined = shuffle([...randomVideos, ...randomPhotos])
    setItems(combined)
  }, []) // Run only once on mount

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, items.length])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  useEffect(() => {
    if (autoplay) return

    const timeout = setTimeout(() => {
      setAutoplay(true)
    }, 10000)

    return () => clearTimeout(timeout)
  }, [autoplay])

  // Don't render until items are loaded
  if (items.length === 0) {
    return null
  }

  const currentItem = items[currentIndex]
  const isVideo = currentItem.type === "video"

  return (
    <section
      style={{ backgroundColor: theme.colors.neutral.bg }}
      className="relative w-full h-[28rem] mt-16 overflow-hidden rounded-xl"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {isVideo ? (
            <video 
              src={currentItem.imageUrl} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
          ) : (
            <Image
              src={currentItem.imageUrl || "/placeholder.svg"}
              alt={currentItem.title}
              fill
              className="object-cover"
              style={{ objectPosition: 'center center' }}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.colors.neutral.text }}>
            {t.hero.title}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg max-w-2xl mb-6"
          style={{ color: theme.colors.neutral.textSecondary }}
        >
          {t.hero.subtitle}
        </motion.p>

        {isVideo && (
          <div className="flex items-center gap-2 text-white">
            {/* Video controls will be handled by VideoPlayer component */}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {items.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setAutoplay(false)
              setCurrentIndex(index)
            }}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: index === currentIndex ? theme.colors.accent.orange : theme.colors.neutral.textSecondary,
            }}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-colors hover:bg-white/10"
        style={{ color: theme.colors.neutral.text }}
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full transition-colors hover:bg-white/10"
        style={{ color: theme.colors.neutral.text }}
      >
        <ChevronRight size={24} />
      </motion.button>
    </section>
  )
}
