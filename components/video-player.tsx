// Reusable video player component for displaying videos with poster image
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { motion } from "framer-motion"
import { theme } from "@/lib/theme"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoPlay?: boolean
}

export function VideoPlayer({ src, poster, title, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(percent)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = percent * videoRef.current.duration
    }
  }

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover"
      />

      {/* Play Button Overlay */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isPlaying ? 0 : 1, scale: isPlaying ? 0.8 : 1 }}
        className="absolute inset-0 flex items-center justify-center"
        onClick={handlePlayPause}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          pointerEvents: isPlaying ? "none" : "auto",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-full"
          style={{ backgroundColor: theme.colors.accent.orange }}
        >
          <Play size={32} fill="white" color="white" />
        </motion.div>
      </motion.button>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              backgroundColor: theme.colors.accent.orange,
            }}
          />
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className="p-2 rounded hover:bg-white/10"
            >
              {isPlaying ? <Pause size={20} color="white" /> : <Play size={20} color="white" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMute}
              className="p-2 rounded hover:bg-white/10"
            >
              {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFullscreen}
            className="p-2 rounded hover:bg-white/10"
          >
            <Maximize size={20} color="white" />
          </motion.button>
        </div>
      </motion.div>

      {title && (
        <div className="absolute top-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-sm font-semibold">{title}</p>
        </div>
      )}
    </div>
  )
}
