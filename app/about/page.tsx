// About page - Information about the studio and creators - with Framer Motion animations
"use client"

import { creators } from "@/lib/data"
import { theme } from "@/lib/theme"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"
import { motion } from "framer-motion"
import { CheckCircle2, Instagram, Send } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const { language } = useLanguageContext()
  const t = translations[language]

  const advantages = [
    {
      titleKey: "about.independentDesigners" as const,
      descriptionKey: "about.independentDesignersDesc" as const,
    },
    {
      titleKey: "about.exclusiveUniqueness" as const,
      descriptionKey: "about.exclusiveUniquenessDesc" as const,
    },
    {
      titleKey: "about.highQuality" as const,
      descriptionKey: "about.highQualityDesc" as const,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div style={{ backgroundColor: theme.colors.neutral.bg }} className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: theme.colors.neutral.text }}>
            {t.about.title}
          </h1>
          <p className="text-lg max-w-3xl" style={{ color: theme.colors.neutral.textSecondary }}>
            {t.about.description ||
              "DVSY is a premium creative studio specializing in high-end photography and videography. We are dedicated to capturing moments that tell stories and create lasting impressions. Our team of two talented creators brings unique perspectives and technical excellence to every project."}
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: theme.colors.neutral.text }}>
              {t.about.storyTitle || "Our Story"}
            </h2>
            <p className="text-base mb-4" style={{ color: theme.colors.neutral.textSecondary }}>
              {t.about.storyText ||
                "Founded with a passion for visual storytelling, DVSY emerged from the collaboration of two talented creatives who share a vision of excellence. Each project is an opportunity to push creative boundaries and deliver work that exceeds expectations."}
            </p>
            <p className="text-base" style={{ color: theme.colors.neutral.textSecondary }}>
              {t.about.storyTextSecond ||
                "Whether it's fashion photography, automotive cinematic, lifestyle documentation, or event coverage, we approach every assignment with the same level of dedication and artistry that has earned us recognition in the industry."}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 rounded-lg overflow-hidden border group cursor-pointer"
            style={{ borderColor: theme.colors.neutral.border }}
          >
            <Image
              src="/creative-studio-workspace.jpg"
              alt="DVSY Studio"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Advantages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: theme.colors.neutral.text }}>
            {t.about.advantagesTitle || "Our Advantages"}
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-8 rounded-lg border cursor-pointer"
                style={{
                  borderColor: theme.colors.neutral.border,
                  backgroundColor: theme.colors.neutral.bgSecondary,
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + index * 0.1 }}>
                    <CheckCircle2
                      size={24}
                      style={{ color: theme.colors.accent.orange }}
                      className="flex-shrink-0 mt-1"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: theme.colors.neutral.text }}>
                      {t.about[advantage.titleKey.split(".")[1] as keyof typeof t.about]}
                    </h3>
                    <p style={{ color: theme.colors.neutral.textSecondary }}>{t.about[advantage.descriptionKey.split(".")[1] as keyof typeof t.about]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-lg border"
          style={{ backgroundColor: theme.colors.neutral.bgSecondary, borderColor: theme.colors.neutral.border }}
        >
          <div className="py-16 px-8">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: theme.colors.neutral.text }}>
              {t.creators.title}
            </h2>

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
                  className="text-center group"
                >
                  <div
                    className="relative h-64 w-64 mx-auto mb-6 rounded-lg overflow-hidden border cursor-pointer"
                    style={{ borderColor: theme.colors.neutral.border }}
                  >
                    <Image
                      src={creator.imageUrl || "/placeholder.svg"}
                      alt={creator.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: theme.colors.neutral.text }}>
                    {creator.id === "1" ? t.creators.nadya.name : creator.id === "2" ? t.creators.viktoria.name : creator.name}
                  </h3>
                  <p className="text-sm uppercase tracking-widest mb-4" style={{ color: theme.colors.accent.orange }}>
                    {creator.role === "photographer" ? t.creators.photographer : t.creators.videographer}
                  </p>
                  <p style={{ color: theme.colors.neutral.textSecondary }}>
                    {creator.id === "1" ? t.creators.nadya.bio : creator.id === "2" ? t.creators.viktoria.bio : creator.bio}
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-6">
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
