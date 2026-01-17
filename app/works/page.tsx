"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import { portfolioItems } from "@/lib/data"
import { theme } from "@/lib/theme"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"
import { addBasePath } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { Play } from "lucide-react"

function WorksContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language } = useLanguageContext()
  const t = translations[language]

  // Get unique creators and locations for filters
  const creators = Array.from(new Set(portfolioItems.flatMap((item) => item.creator)))
  const locations = Array.from(new Set(portfolioItems.map((item) => item.location)))
  const categories = Array.from(new Set(portfolioItems.map((item) => item.category)))

  // Filter states
  const [selectedCreators, setSelectedCreators] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const category = searchParams.get("category")
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories([category])
    }
  }, [searchParams])

  // Filter logic
  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      const creatorMatch = selectedCreators.length === 0 || item.creator.some(creator => selectedCreators.includes(creator))
      const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(item.location)
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.category)

      return creatorMatch && locationMatch && categoryMatch
    })
  }, [selectedCreators, selectedLocations, selectedCategories])

  const toggleFilter = (
    type: "creator" | "location" | "category",
    value: string,
    state: string[],
    setState: (val: string[]) => void,
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value))
    } else {
      setState([...state, value])
    }
  }

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
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
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
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: theme.colors.neutral.text }}>
            {t.works.title}
          </h1>
          <p className="text-lg" style={{ color: theme.colors.neutral.textSecondary }}>
            {t.works.description}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Creator Filter */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: theme.colors.accent.orange }}
            >
              {t.filter.byCreator}
            </h3>
            <div className="flex flex-col gap-3">
              {creators.map((creator) => (
                <label key={creator} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCreators.includes(creator)}
                    onChange={() => toggleFilter("creator", creator, selectedCreators, setSelectedCreators)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: theme.colors.accent.orange }}
                  />
                  <span style={{ color: theme.colors.neutral.text }} className="capitalize">
                    {creator === "photographer" ? t.filter.photographer : t.filter.videographer}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: theme.colors.accent.orange }}
            >
              {t.filter.byLocation}
            </h3>
            <div className="flex flex-col gap-3">
              {locations.map((location) => (
                <label key={location} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={() => toggleFilter("location", location, selectedLocations, setSelectedLocations)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: theme.colors.accent.orange }}
                  />
                  <span style={{ color: theme.colors.neutral.text }}>{location}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: theme.colors.accent.orange }}
            >
              {t.filter.byCategory}
            </h3>
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleFilter("category", category, selectedCategories, setSelectedCategories)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: theme.colors.accent.orange }}
                  />
                  <span style={{ color: theme.colors.neutral.text }} className="capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Portfolio Grid - Added onClick to open project detail */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            whileHover={{ y: -10 }}
            onClick={() => router.push(`/work/${item.id}`)}
            className="group cursor-pointer relative h-80 overflow-hidden rounded-lg"
          >
              {item.type === "video" && item.imageUrl.endsWith(".mp4") ? (
                <video
                  src={addBasePath(item.imageUrl)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={addBasePath(item.imageUrl || "/placeholder.svg")}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}

              {/* Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              >
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <div className="flex gap-3 text-sm text-gray-300">
                    <span className="capitalize">{item.category}</span>
                    <span>·</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Video Badge */}
              {item.type === "video" && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white p-2 rounded-full">
                  <Play size={20} fill="white" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: theme.colors.neutral.textSecondary }} className="text-lg">
              {t.works.noResults}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <div style={{ backgroundColor: "#0A0E27" }} className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full" />
      </motion.div>
    </div>
  )
}

export default function WorksPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WorksContent />
    </Suspense>
  )
}
