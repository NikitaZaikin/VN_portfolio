// Lightbox modal for viewing photos and videos in full size
"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import { theme } from "@/lib/theme"
import { addBasePath } from "@/lib/utils"

interface LightboxModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  title?: string
  videoIndices?: number[]
}

export function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  title,
  videoIndices = [],
}: LightboxModalProps) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [isOpen, onClose, onNext, onPrev],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const isVideo = videoIndices.includes(currentIndex)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: theme.colors.neutral.text }}
          >
            <X size={28} />
          </motion.button>

          {/* Image Counter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-6 z-50 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: theme.colors.neutral.text,
            }}
          >
            {currentIndex + 1} / {images.length}
          </motion.div>

          {/* Title */}
          {title && (
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-lg font-semibold"
              style={{ color: theme.colors.neutral.text }}
            >
              {title}
            </motion.h3>
          )}

          {/* Previous Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 md:left-8 z-50 p-3 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: theme.colors.neutral.text }}
          >
            <ChevronLeft size={40} />
          </motion.button>

          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 md:right-8 z-50 p-3 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: theme.colors.neutral.text }}
          >
            <ChevronRight size={40} />
          </motion.button>

          {/* Image/Video Display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-[90vw] h-[80vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <div className="w-full h-full flex items-center justify-center">
                <video
                  src={addBasePath(images[currentIndex])}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-lg"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            ) : (
              <Image
                src={addBasePath(images[currentIndex] || "/placeholder.svg")}
                alt={`Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            )}
          </motion.div>

          {/* Thumbnail Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-50 overflow-x-auto max-w-[90vw] px-4"
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  const diff = idx - currentIndex
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext()
                  } else {
                    for (let i = 0; i < Math.abs(diff); i++) onPrev()
                  }
                }}
                className="relative w-16 h-12 rounded overflow-hidden transition-all flex-shrink-0"
                style={{
                  border: idx === currentIndex ? `2px solid ${theme.colors.accent.orange}` : "2px solid transparent",
                  opacity: idx === currentIndex ? 1 : 0.5,
                }}
              >
                <Image src={addBasePath(img || "/placeholder.svg")} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                {videoIndices.includes(idx) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play size={16} fill="white" color="white" />
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
