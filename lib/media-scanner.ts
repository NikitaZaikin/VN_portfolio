// Utility for scanning and managing media files from folders
import type { MediaItem, Photo } from "./data"
import { readdir } from "fs/promises"
import { join } from "path"

// Supported image extensions
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]
// Supported video extensions
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".avi", ".mkv"]

/**
 * Get all files from a directory (client-side safe - uses public folder paths)
 * Note: In Next.js, we can't directly read filesystem on client, so this works with public folder structure
 */
export async function scanMediaFolder(
  folderPath: string,
  fileTypes: "images" | "videos" | "both" = "both"
): Promise<string[]> {
  // Remove leading slash if present
  const cleanPath = folderPath.startsWith("/") ? folderPath.slice(1) : folderPath
  const fullPath = join(process.cwd(), "public", cleanPath)

  try {
    const files = await readdir(fullPath)
    const extensions =
      fileTypes === "images"
        ? IMAGE_EXTENSIONS
        : fileTypes === "videos"
          ? VIDEO_EXTENSIONS
          : [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS]

    const mediaFiles = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf("."))
        return extensions.includes(ext)
      })
      .map((file) => `/${cleanPath}/${file}`)
      .sort() // Alphabetical by default

    return mediaFiles
  } catch (error) {
    console.warn(`Could not scan folder ${folderPath}:`, error)
    return []
  }
}

/**
 * Merge automatic folder scanning with manual media items
 * Priority: manual items first (if provided), then auto-scanned items
 */
export function mergeMediaItems(
  autoScanned: string[],
  manualItems?: MediaItem[]
): MediaItem[] {
  // If manual items are provided, use them as base
  if (manualItems && manualItems.length > 0) {
    // Get paths from manual items
    const manualPaths = new Set(manualItems.map((item) => item.path))

    // Add auto-scanned items that aren't in manual list
    const additionalItems: MediaItem[] = autoScanned
      .filter((path) => !manualPaths.has(path))
      .map((path, index) => ({
        path,
        order: (manualItems.length || 0) + index + 1, // Continue ordering after manual items
      }))

    // Combine and sort by order
    return [...manualItems, ...additionalItems].sort((a, b) => {
      const orderA = a.order ?? 9999
      const orderB = b.order ?? 9999
      return orderA - orderB
    })
  }

  // If no manual items, return auto-scanned as MediaItem array
  return autoScanned.map((path, index) => ({
    path,
    order: index + 1,
  }))
}

/**
 * Get all media files for a project (photos and videos)
 * Combines automatic folder scanning with manual overrides
 */
export async function getProjectMedia(project: Photo): Promise<{
  photos: MediaItem[]
  videos: MediaItem[]
  mainImage: string
  mainVideo?: string
}> {
  let photos: MediaItem[] = []
  let videos: MediaItem[] = []

  // Handle photos
  if (project.manualPhotos && project.manualPhotos.length > 0) {
    // Use manual photos
    photos = project.manualPhotos.sort((a, b) => {
      const orderA = a.order ?? 9999
      const orderB = b.order ?? 9999
      return orderA - orderB
    })
  } else if (project.photosFolder) {
    // Auto-scan photos folder
    const scannedPhotos = await scanMediaFolder(project.photosFolder, "images")
    photos = scannedPhotos.map((path, index) => ({
      path,
      order: index + 1,
    }))
  } else {
    // Fallback to gallery array
    photos = project.gallery
      .filter((url) => !url.endsWith(".mp4") && !url.includes("mp4"))
      .map((path, index) => ({
        path,
        order: index + 1,
      }))
  }

  // Handle videos
  if (project.manualVideos && project.manualVideos.length > 0) {
    // Use manual videos
    videos = project.manualVideos.sort((a, b) => {
      const orderA = a.order ?? 9999
      const orderB = b.order ?? 9999
      return orderA - orderB
    })
  } else if (project.videosFolder) {
    // Auto-scan videos folder
    const scannedVideos = await scanMediaFolder(project.videosFolder, "videos")
    videos = scannedVideos.map((path, index) => ({
      path,
      order: index + 1,
    }))
  } else {
    // Fallback to gallery array
    videos = project.gallery
      .filter((url) => url.endsWith(".mp4") || url.includes("mp4"))
      .map((path, index) => ({
        path,
        order: index + 1,
      }))
  }

  // Find main image/video
  const mainPhoto = photos.find((item) => item.isMain) || photos[0]
  const mainVideo = videos.find((item) => item.isMain) || videos[0]

  return {
    photos,
    videos,
    mainImage: mainPhoto?.path || project.imageUrl,
    mainVideo: mainVideo?.path,
  }
}

/**
 * Get gallery array (all photos + videos combined, sorted by order)
 */
export async function getProjectGallery(project: Photo): Promise<string[]> {
  const media = await getProjectMedia(project)
  const allMedia: MediaItem[] = [...media.photos, ...media.videos]

  // Sort by order
  allMedia.sort((a, b) => {
    const orderA = a.order ?? 9999
    const orderB = b.order ?? 9999
    return orderA - orderB
  })

  return allMedia.map((item) => item.path)
}

