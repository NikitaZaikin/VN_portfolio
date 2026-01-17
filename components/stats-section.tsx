// Statistics section displaying portfolio metrics - with Framer Motion
"use client"
import { motion } from "framer-motion"
import { theme } from "@/lib/theme"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"

export function StatsSection() {
  const { language } = useLanguageContext()
  const t = translations[language]

  const stats = [
    { label: t.stats.photoshoots, value: "150+" },
    { label: t.stats.projects, value: "500+" },
    { label: t.stats.videos, value: "20K+" },
    { label: t.stats.clients, value: "50+" },
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
    <section style={{ backgroundColor: theme.colors.neutral.bg }} className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center py-8 px-4 rounded-lg border cursor-pointer"
              style={{
                borderColor: theme.colors.neutral.border,
                backgroundColor: theme.colors.neutral.bgSecondary,
              }}
            >
              {/* Large Number */}
              <h3 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: theme.colors.accent.orange }}>
                {stat.value}
              </h3>

              {/* Label */}
              <p
                className="text-xs md:text-sm uppercase tracking-widest"
                style={{ color: theme.colors.neutral.textSecondary }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
