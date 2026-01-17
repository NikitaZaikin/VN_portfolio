// Client component for project page
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { portfolioItems } from "@/lib/data"
import { theme } from "@/lib/theme"
import { useLanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/lib/i18n"
import { ArrowLeft, Camera, MapPin, User, Play, Expand } from "lucide-react"
import Image from "next/image"
import { LightboxModal } from "@/components/lightbox-modal"
import { getProjectGalleryClient, getProjectMediaClient } from "@/lib/media-utils"
import { isVideoFile } from "@/lib/media-helpers"
import { addBasePath } from "@/lib/utils"

export function ProjectPageClient() {
  const router = useRouter()
  const params = useParams()
  const { language } = useLanguageContext()
  const t = translations[language]

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Find the project by ID
  const project = portfolioItems.find((item) => item.id === params.id)

  // Load media (auto-scan folders or use manual/fallback)
  useEffect(() => {
    if (!project) {
      setIsLoading(false)
      return
    }

    const loadMedia = async () => {
      setIsLoading(true)
      try {
        // Load media asynchronously
        const [gallery, media] = await Promise.all([
          getProjectGalleryClient(project),
          getProjectMediaClient(project),
        ])
        
        // Update state with loaded media
        if (gallery.length > 0) {
          setGalleryImages(gallery)
        } else if (project.gallery && project.gallery.length > 0) {
          setGalleryImages(project.gallery)
        } else {
          setGalleryImages([project.imageUrl].filter(Boolean))
        }
        
        // Set main image - prioritize project.imageUrl if it's an image
        if (project.imageUrl && !isVideoFile(project.imageUrl)) {
          setMainImage(project.imageUrl)
        } else if (media.mainImage) {
          setMainImage(media.mainImage)
        } else {
          setMainImage(project.imageUrl || "")
        }
      } catch (error) {
        console.error("Error loading media:", error)
        // Fallback to project defaults
        setGalleryImages(project.gallery || [project.imageUrl].filter(Boolean))
        setMainImage(project.imageUrl || "")
      } finally {
        setIsLoading(false)
      }
    }

    loadMedia()
  }, [project])

  if (!project) {
    return (
      <div
        style={{ backgroundColor: theme.colors.neutral.bg }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 style={{ color: theme.colors.neutral.text }} className="text-3xl font-bold mb-4">
            {t.work.notFound}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="px-6 py-3 rounded text-white font-semibold"
            style={{ backgroundColor: theme.colors.accent.orange }}
          >
            {t.work.goBack}
          </motion.button>
        </div>
      </div>
    )
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const videoIndices = galleryImages
    .map((url, index) => (isVideoFile(url) ? index : -1))
    .filter((index) => index !== -1)

  return (
    <div style={{ backgroundColor: theme.colors.neutral.bg }} className="min-h-screen pt-24 pb-20">
      <LightboxModal
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        title={project.title}
        videoIndices={videoIndices}
      />

      {/* Header with Back Button */}
      <div className="px-6 mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 font-semibold"
          style={{ color: theme.colors.accent.orange }}
        >
          <ArrowLeft size={20} />
          {t.works.backToWorks}
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Image - Clickable to open lightbox */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() => openLightbox(0)}
          className="relative w-full h-[400px] md:h-[600px] mb-12 rounded-lg overflow-hidden border cursor-pointer group"
          style={{ borderColor: theme.colors.neutral.border }}
        >
          {isVideoFile(mainImage) ? (
            <video
              src={addBasePath(mainImage)}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <Image
              src={addBasePath(mainImage || project.imageUrl || "/placeholder.svg")}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
              unoptimized={mainImage?.startsWith("/projects/")}
            />
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="p-4 rounded-full" style={{ backgroundColor: theme.colors.accent.orange }}>
                <Expand size={32} className="text-white" />
              </div>
            </motion.div>
          </div>
          {/* Video Badge */}
          {project.type === "video" && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white p-3 rounded-full">
              <Play size={24} fill="white" />
            </div>
          )}
        </motion.div>

        {/* Title and Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: theme.colors.neutral.text }}>
            {project.title}
          </h1>

          {/* Quick Meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded" style={{ backgroundColor: `${theme.colors.accent.orange}15` }}>
                <User size={20} style={{ color: theme.colors.accent.orange }} />
              </div>
              <div>
                <p style={{ color: theme.colors.neutral.textSecondary }} className="text-sm">
                  {t.work.creator}
                </p>
                <p style={{ color: theme.colors.neutral.text }} className="font-semibold">
                  {project.creator.map((role, idx) => (
  <span key={project.id + '-' + role + '-' + idx}>
    {role === "photographer" ? t.filter.photographer : t.filter.videographer}
    {idx < project.creator.length - 1 ? ', ' : ''}
  </span>
))}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded" style={{ backgroundColor: `${theme.colors.accent.orange}15` }}>
                <MapPin size={20} style={{ color: theme.colors.accent.orange }} />
              </div>
              <div>
                <p style={{ color: theme.colors.neutral.textSecondary }} className="text-sm">
                  {t.work.location}
                </p>
                <p style={{ color: theme.colors.neutral.text }} className="font-semibold">
                  {project.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded" style={{ backgroundColor: `${theme.colors.accent.orange}15` }}>
                <Camera size={20} style={{ color: theme.colors.accent.orange }} />
              </div>
              <div>
                <p style={{ color: theme.colors.neutral.textSecondary }} className="text-sm">
                  {t.work.category}
                </p>
                <p style={{ color: theme.colors.neutral.text }} className="font-semibold capitalize">
                  {project.category}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.neutral.text }}>
              {t.work.about}
            </h2>
            <p style={{ color: theme.colors.neutral.textSecondary }} className="text-lg leading-relaxed max-w-3xl">
              {t.work.projectDescription
                .replace("{category}", project.category)
                .replace("{type}", project.type === "video" ? t.work.videoProduction : t.work.photoSession)
                .replace("{location}", project.location)}
            </p>
          </div>
        </motion.div>

        {/* Gallery Grid - Clickable images */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.colors.neutral.text }}>
            {t.work.gallery}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.length === 0 && isLoading ? (
              <div className="col-span-full text-center py-12">
                <p style={{ color: theme.colors.neutral.textSecondary }}>Loading media...</p>
              </div>
            ) : (
              galleryImages.map((image, index) => {
                const isVideo = isVideoFile(image)

                return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7, delay: index * 0.11 }}
                  whileHover={{ y: -10 }}
                  onClick={() => openLightbox(index)}
                  className="relative h-[300px] rounded-lg overflow-hidden border group cursor-pointer"
                  style={{ borderColor: theme.colors.neutral.border }}
                >
                  {isVideo ? (
                    <>
                      <video
                        src={addBasePath(image)}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="p-3 rounded-full" style={{ backgroundColor: theme.colors.accent.orange }}>
                          <Play size={32} fill="white" color="white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={addBasePath(image || "/placeholder.svg")}
                      alt={`${project.title} - ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {/* Hover overlay with expand icon */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{
                      backgroundColor: `rgba(0, 0, 0, 0.5)`,
                    }}
                  >
                    <div className="p-3 rounded-full" style={{ backgroundColor: theme.colors.accent.orange }}>
                      <Expand size={24} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              )
            }))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-12 rounded-lg border text-center"
          style={{
            borderColor: theme.colors.neutral.border,
            backgroundColor: theme.colors.neutral.bgSecondary,
          }}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: theme.colors.neutral.text }}>
            {t.work.interested}
          </h3>
          <p className="mb-6" style={{ color: theme.colors.neutral.textSecondary }}>
            {t.work.followUs}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/works")}
            className="px-8 py-4 rounded font-bold text-white"
            style={{ backgroundColor: theme.colors.accent.orange }}
          >
            {t.work.viewAllWorks}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
