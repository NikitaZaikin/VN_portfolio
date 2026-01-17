"use client"

import { creators } from "@/lib/data"
import { theme } from "@/lib/theme"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"
import { addBasePath } from "@/lib/utils"
import { Instagram, Send } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function CreatorsSection() {
  const { language } = useLanguageContext()
  const t = translations[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section style={{ backgroundColor: theme.colors.neutral.bgSecondary }} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.colors.neutral.text }}>
            {t.creators.title}
          </h2>
          <p className="text-sm uppercase tracking-widest" style={{ color: theme.colors.accent.orange }}>
            {t.creators.subtitle}
          </p>
        </motion.div>

        {/* Creators Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {creators.map((creator) => (
            <motion.div
              key={creator.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="rounded-lg overflow-hidden border group cursor-pointer"
              style={{
                borderColor: theme.colors.neutral.border,
                backgroundColor: theme.colors.neutral.bg,
              }}
            >
              {/* Creator Image */}
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={addBasePath(creator.imageUrl || "/placeholder.svg")}
                  alt={creator.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(10, 14, 39, 0.2)" }} />
              </div>

              {/* Creator Info */}
              <div className="p-8">
                {/* Role Badge */}
                <p
                  className="text-xs uppercase tracking-widest mb-4 font-bold"
                  style={{ color: theme.colors.accent.orange }}
                >
                  {creator.role === "photographer" ? t.creators.photographer : t.creators.videographer}
                </p>

                {/* Name */}
                <h3 className="text-2xl font-bold mb-2" style={{ color: theme.colors.neutral.text }}>
                  {creator.id === "1" ? t.creators.nadya.name : creator.id === "2" ? t.creators.viktoria.name : creator.name}
                </h3>

                {/* Bio */}
                <p className="mb-6" style={{ color: theme.colors.neutral.textSecondary }}>
                  {creator.id === "1" ? t.creators.nadya.bio : creator.id === "2" ? t.creators.viktoria.bio : creator.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4">
                  {creator.socials.instagram && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      href={creator.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded hover:opacity-70 transition-opacity"
                      style={{
                        backgroundColor: `${theme.colors.accent.orange}15`,
                        color: theme.colors.accent.orange,
                      }}
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </motion.a>
                  )}
                  {creator.socials.telegram && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      href={creator.socials.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded hover:opacity-70 transition-opacity"
                      style={{
                        backgroundColor: `${theme.colors.accent.orange}15`,
                        color: theme.colors.accent.orange,
                      }}
                      aria-label="Telegram"
                    >
                      <Send size={20} />
                    </motion.a>
                  )}
                  {creator.socials.email && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      href={`mailto:${creator.socials.email}`}
                      className="p-2 rounded hover:opacity-70 transition-opacity"
                      style={{
                        backgroundColor: `${theme.colors.accent.orange}15`,
                        color: theme.colors.accent.orange,
                      }}
                      aria-label="Email"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
