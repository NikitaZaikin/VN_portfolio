"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { theme } from "@/lib/theme"
import { categories, portfolioItems } from "@/lib/data"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"
import { addBasePath } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function CategoryCards() {
  const [scrollX, setScrollX] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [shouldScrollCategory, setShouldScrollCategory] = useState(false)
  const [isManualScrolling, setIsManualScrolling] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const hoverTimerRef = useRef<NodeJS.Timeout>()
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout>()
  const { language } = useLanguageContext()
  const t = translations[language]

  // Helper function to check if image is valid (not video, not http, not placeholder)
  const isValidImage = (url: string): boolean => {
    if (!url) return false
    // Skip video files
    if (url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi')) return false
    // Skip http/https URLs (external videos)
    if (url.startsWith('http://') || url.startsWith('https://')) return false
    // Skip placeholder images
    if (url.includes('placeholder')) return false
    return true
  }

  // Pre-compute category images once - this prevents flickering
  // Maps category ID to its image URL
  const categoryImagesMap = useMemo(() => {
    const imagesMap: Record<string, string> = {}

    categories.forEach((category) => {
      // If category has its own image, use it
      if (category.imageUrl) {
        imagesMap[category.id] = category.imageUrl
        return
      }

      // Otherwise, get random image from projects in this category
      const categoryName = category.name.toLowerCase()
      const categoryItems = portfolioItems.filter((item) => item.category === categoryName)
      
      if (categoryItems.length === 0) {
        imagesMap[category.id] = "/placeholder.svg"
        return
      }

      // Collect all available images from projects in this category
      const availableImages: string[] = []
      
      categoryItems.forEach((item) => {
        // Add main image if it exists and is valid
        if (item.imageUrl && isValidImage(item.imageUrl)) {
          availableImages.push(item.imageUrl)
        }
        
        // Add images from gallery if they exist
        if (item.gallery && item.gallery.length > 0) {
          item.gallery.forEach((img) => {
            if (isValidImage(img)) {
              availableImages.push(img)
            }
          })
        }
      })

      // Select random image once and store it
      if (availableImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableImages.length)
        imagesMap[category.id] = availableImages[randomIndex]
      } else {
        imagesMap[category.id] = "/placeholder.svg"
      }
    })

    return imagesMap
  }, []) // Empty dependency array - compute only once on mount

  // Get image for category from pre-computed map
  const getCategoryImage = (category: { id: string; name: string; imageUrl?: string }) => {
    return categoryImagesMap[category.id] || "/placeholder.svg"
  }

  useEffect(() => {
    const speed = 0.5 // pixels per frame (adjust for faster/slower scrolling)

    const animate = () => {
      // Автопрокрутка работает только если не на паузе и не идет ручная прокрутка
      if (!isPaused && !isManualScrolling && scrollContainerRef.current) {
        setScrollX((prev) => {
          const container = scrollContainerRef.current
          if (!container) return prev

          // Calculate the width of one full set of cards
          const cardWidth = 400 // approximate width including gap
          const totalWidth = categories.length * cardWidth

          // Reset to 0 when reaching the end for seamless loop
          if (prev >= totalWidth) {
            return 0
          }

          return prev + speed
        })
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPaused, isManualScrolling, categories.length])

  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsPaused(true)

    // After 1 second of hovering, enable category scrolling
    hoverTimerRef.current = setTimeout(() => {
      setShouldScrollCategory(true)
    }, 1000) // 1 second delay
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsPaused(false)
    setShouldScrollCategory(false)
    setIsManualScrolling(false)

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
    }
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    // Этот обработчик нужен только для fallback, основная логика в глобальном обработчике
  }

  // Блокировка overflow и обработка wheel для скролла категорий
  useEffect(() => {
    if (shouldScrollCategory) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      const handleWheelGlobal = (e: WheelEvent) => {
        const target = e.target as HTMLElement
        // Проверяем, что событие происходит внутри нашего контейнера
        if (scrollContainerRef.current?.contains(target)) {
          e.preventDefault()
          e.stopPropagation()
          
          // Простая и отзывчивая прокрутка - напрямую изменяем scrollX
          setScrollX((prev) => {
            const delta = e.deltaY * 2.0 // Множитель для скорости прокрутки
            const newScroll = prev + delta
            
            // Мягкие границы - позволяем немного выйти за пределы
            const cardWidth = 380
            const gap = 24
            const totalCardWidth = categories.length * (cardWidth + gap)
            const containerWidth = scrollContainerRef.current?.clientWidth || window.innerWidth
            const maxScroll = totalCardWidth - containerWidth + 120
            
            // Мягкие границы с небольшим отскоком
            if (newScroll < -50) {
              return -50 + (newScroll + 50) * 0.3
            } else if (newScroll > maxScroll + 50) {
              return maxScroll + 50 - (newScroll - maxScroll - 50) * 0.3
            }
            
            return newScroll
          })
          
          // Отмечаем что идет ручная прокрутка
          setIsManualScrolling(true)
          
          // Очищаем предыдущий таймер
          if (manualScrollTimeoutRef.current) {
            clearTimeout(manualScrollTimeoutRef.current)
          }
          
          // Через 1 секунду после последней прокрутки возобновляем автопрокрутку
          manualScrollTimeoutRef.current = setTimeout(() => {
            setIsManualScrolling(false)
          }, 1000)
          
          return false
        }
      }
      
      window.addEventListener('wheel', handleWheelGlobal, { passive: false, capture: true })
      document.addEventListener('wheel', handleWheelGlobal, { passive: false, capture: true })
      
      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('wheel', handleWheelGlobal, { capture: true })
        document.removeEventListener('wheel', handleWheelGlobal, { capture: true })
        if (manualScrollTimeoutRef.current) {
          clearTimeout(manualScrollTimeoutRef.current)
        }
      }
    }
  }, [shouldScrollCategory, categories.length])

  // Используем дублирование для бесконечной автоматики (seamless loop), как раньше
  const duplicatedCategories = [...categories, ...categories, ...categories]

  return (
    <section style={{ backgroundColor: theme.colors.neutral.bgSecondary }} className="py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: theme.colors.neutral.text }}>
            {t.categories.title}
          </h2>
          <p className="text-sm uppercase tracking-widest" style={{ color: theme.colors.accent.orange }}>
            {t.categories.explore}
          </p>
        </motion.div>

        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          className="relative overflow-hidden"
          style={{ 
            overflowX: 'hidden',
            overflowY: 'hidden',
            touchAction: shouldScrollCategory ? 'none' : 'auto'
          }}
        >
          <motion.div
            className="flex gap-6"
            style={{
              transform: `translateX(-${scrollX}px)`,
              transition: isManualScrolling ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            {duplicatedCategories.map((card, index) => {
              const categoryImage = getCategoryImage(card)

              return (
                <Link key={`${card.id}-${index}`} href={`/works?category=${card.name.toLowerCase()}`}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="flex-shrink-0 w-[380px] cursor-pointer overflow-hidden rounded-lg h-80 relative"
                    style={{ borderRadius: '12px' }}
                  >
                    {/* Background Image */}
                    <Image
                      src={addBasePath(categoryImage || "/placeholder.svg")}
                      alt={card.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ borderRadius: '12px' }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0" style={{ backgroundColor: "rgba(10, 14, 39, 0.6)" }} />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl mb-4"
                      >
                        {card.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: theme.colors.neutral.text }}>
                        {card.name}
                      </h3>
                      <p className="text-sm" style={{ color: theme.colors.neutral.textSecondary }}>
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </motion.div>

          {/* Gradient Overlays for smooth edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${theme.colors.neutral.bgSecondary}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${theme.colors.neutral.bgSecondary}, transparent)`,
            }}
          />
        </div>

        {/* Hint Text */}
        <p
          className="text-xs text-center mt-6 uppercase tracking-widest"
          style={{ color: theme.colors.neutral.textSecondary }}
        >
          {t.categories.scrollHint || "Hover to pause • Scroll with mouse wheel"}
        </p>
      </div>
    </section>
  )
}
