// Header component with burger menu navigation and language switcher
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { theme } from "@/lib/theme"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"
import type { Language } from "@/lib/i18n"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguageContext()
  const t = translations[language]

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.works, href: "/works" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ]

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "uk", label: "UK" },
    { code: "ro", label: "RO" },
  ]

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      style={{
        backgroundColor: theme.colors.neutral.bg,
        borderBottom: `1px solid ${theme.colors.neutral.border}`,
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="text-2xl font-bold tracking-wider" style={{ color: theme.colors.accent.orange }}>
            DVSY
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -2 }}>
              <Link
                href={item.href}
                style={{ color: theme.colors.neutral.text }}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div
            className="flex items-center gap-2 border-l border-r px-2"
            style={{ borderColor: theme.colors.neutral.border }}
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(lang.code)}
                className="px-2 py-1 text-xs font-bold rounded transition-all"
                style={{
                  color: language === lang.code ? "white" : theme.colors.neutral.textSecondary,
                  backgroundColor: language === lang.code ? theme.colors.accent.orange : "transparent",
                }}
              >
                {lang.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMenuToggle}
            className="md:hidden"
            style={{ color: theme.colors.neutral.text }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: theme.colors.neutral.bgSecondary,
              borderTop: `1px solid ${theme.colors.neutral.border}`,
            }}
            className="md:hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    style={{ color: theme.colors.neutral.text }}
                    className="block py-2 font-medium hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
