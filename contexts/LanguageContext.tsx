"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage after mount
    setIsMounted(true)
    const stored = localStorage.getItem("language") as Language | null
    if (stored && ["uk", "en", "ro"].includes(stored)) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguageContext must be used within LanguageProvider")
  }
  return context
}
