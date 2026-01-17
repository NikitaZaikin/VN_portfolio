"use client"

import { motion } from "framer-motion"
import { theme } from "@/lib/theme"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { Mail, MapPin, Instagram } from "lucide-react"
import { translations } from "@/lib/i18n"

export default function ContactPage() {
  const { language } = useLanguageContext()
  const t = translations[language]

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.email,
      value: "hello@dvsy.studio",
      href: "mailto:hello@dvsy.studio",
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: "Ukraine, Kyiv",
      href: "#",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@dvsy.studio",
      href: "https://instagram.com",
    },
  ]

  const workLocations = [
    { name: t.contact.ukraine, description: t.contact.ukraineDesc, icon: "🇺🇦" },
    { name: t.contact.moldova, description: t.contact.moldovaDesc, icon: "🇲🇩" },
  ]

  const services = [
    { title: t.contact.photography, description: "Portrait, Fashion, Product, Events" },
    { title: t.contact.videography, description: "Cinematic, Event Coverage, Corporate" },
    { title: t.contact.events, description: "Weddings, Conferences, Celebrations" },
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
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: theme.colors.neutral.text }}>
            {t.contact.title}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.colors.neutral.textSecondary }}>
            {t.contact.description}
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={info.href}
              className="group p-8 rounded-lg border hover:border-orange-500 transition-colors"
              style={{
                borderColor: theme.colors.neutral.border,
                backgroundColor: theme.colors.neutral.bgSecondary,
              }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded" style={{ backgroundColor: `${theme.colors.accent.orange}15` }}>
                  <info.icon size={24} style={{ color: theme.colors.accent.orange }} />
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: theme.colors.neutral.text }}>
                    {info.label}
                  </h3>
                  <p
                    style={{ color: theme.colors.neutral.textSecondary }}
                    className="group-hover:opacity-70 transition-opacity"
                  >
                    {info.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Work Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.colors.neutral.text }}>
            {t.contact.workLocations}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workLocations.map((location, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-lg border"
                style={{
                  borderColor: theme.colors.neutral.border,
                  backgroundColor: theme.colors.neutral.bgSecondary,
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-5xl flex-shrink-0">{location.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: theme.colors.neutral.text }}>
                      {location.name}
                    </h3>
                    <p style={{ color: theme.colors.neutral.textSecondary }} className="">
                      {location.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.colors.neutral.text }}>
            {t.contact.serviceCapabilities}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-8 rounded-lg border"
                style={{
                  borderColor: theme.colors.neutral.border,
                  backgroundColor: theme.colors.neutral.bgSecondary,
                }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: theme.colors.accent.orange }}>
                  {service.title}
                </h3>
                <p style={{ color: theme.colors.neutral.textSecondary }}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section - Removed email button, directing to socials instead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-12 rounded-lg border text-center"
          style={{
            borderColor: theme.colors.neutral.border,
            backgroundColor: theme.colors.neutral.bgSecondary,
          }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.neutral.text }}>
            {t.contact.ready}
          </h2>
          <p className="mb-8" style={{ color: theme.colors.neutral.textSecondary }}>
            {t.contact.reachOut}
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded font-bold text-white"
            style={{ backgroundColor: theme.colors.accent.orange }}
          >
            {t.contact.followSocials}
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
