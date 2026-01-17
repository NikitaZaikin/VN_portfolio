// Hook for managing language state globally
"use client"

import { useState, useCallback, useEffect } from "react"
import { type Language, translations, useTranslation } from "@/lib/i18n"

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage on client side
  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null
    if (stored && Object.keys(translations).includes(stored)) {
      setLanguageState(stored)
    }
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }, [])

  const t = useTranslation(language)

  return { language, setLanguage, t, mounted }
}
