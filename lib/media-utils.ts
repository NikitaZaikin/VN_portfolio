// Client-side utilities for working with media
import type { MediaItem, Photo } from "./data"
import { isVideoFile } from "./media-helpers"

/**
 * Client-side function to scan media folder via API
 */
export async function scanMediaFolderClient(
  folderPath: string,
  fileTypes: "images" | "videos" | "both" = "both"
): Promise<string[]> {
  try {
    const response = await fetch(
      `/api/scan-media?folder=${encodeURIComponent(folderPath)}&type=${fileTypes}`
    )
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.warn(`Could not scan folder ${folderPath}:`, response.status, errorData)
      return []
    }
    const data = await response.json()
    const files = data.files || []
    console.log(`Scanned folder ${folderPath}: found ${files.length} files`)
    return files
  } catch (error) {
    console.warn(`Error scanning folder ${folderPath}:`, error)
    return []
  }
}

/**
 * Get all media files for a project (client-side)
 * Combines automatic folder scanning with manual overrides
 */
export async function getProjectMediaClient(project: Photo): Promise<{
  photos: MediaItem[]
  videos: MediaItem[]
  mainImage: string
  mainVideo?: string
}> {
  let photos: MediaItem[] = []
  let videos: MediaItem[] = []

  // Handle photos
  // Priority: manualPhotos > gallery > photosFolder (API scan) > imageUrl fallback
  if (project.manualPhotos && project.manualPhotos.length > 0) {
    // Use manual photos
    photos = project.manualPhotos.sort((a, b) => {
      const orderA = a.order ?? 9999
      const orderB = b.order ?? 9999
      return orderA - orderB
    })
  } else if (project.gallery && project.gallery.length > 0) {
    // Use gallery array (preferred for static export)
    photos = project.gallery
      .filter((url) => !isVideoFile(url))
      .map((path, index) => ({
        path,
        order: index + 1,
      }))
  } else if (project.photosFolder) {
    // Auto-scan photos folder (client-side via API) - only if gallery is empty
    // Note: This won't work on static export, so gallery should be used instead
    const scannedPhotos = await scanMediaFolderClient(project.photosFolder, "images")
    photos = scannedPhotos.map((path, index) => ({
      path,
      order: index + 1,
    }))
  } else {
    // No photos found - use imageUrl as fallback
    photos = project.imageUrl ? [{ path: project.imageUrl, order: 1, isMain: true }] : []
  }

  // Handle videos
  // Priority: manualVideos > gallery > videosFolder (API scan)
  if (project.manualVideos && project.manualVideos.length > 0) {
    // Use manual videos
    videos = project.manualVideos.sort((a, b) => {
      const orderA = a.order ?? 9999
      const orderB = b.order ?? 9999
      return orderA - orderB
    })
  } else if (project.gallery && project.gallery.length > 0) {
    // Use gallery array (preferred for static export)
    videos = project.gallery
      .filter((url) => isVideoFile(url))
      .map((path, index) => ({
        path,
        order: index + 1,
      }))
  } else if (project.videosFolder) {
    // Auto-scan videos folder (client-side via API) - only if gallery is empty
    // Note: This won't work on static export, so gallery should be used instead
    const scannedVideos = await scanMediaFolderClient(project.videosFolder, "videos")
    videos = scannedVideos.map((path, index) => ({
      path,
      order: index + 1,
    }))
  }
  // If no videos found, videos array stays empty

  // Find main image/video
  // Priority: 1) project.imageUrl if it's an image, 2) item with isMain, 3) first item
  let mainImage = project.imageUrl
  if (!mainImage || isVideoFile(mainImage)) {
    const mainPhoto = photos.find((item) => item.isMain) || photos[0]
    mainImage = mainPhoto?.path || project.imageUrl || ""
  }
  
  const mainVideo = videos.find((item) => item.isMain) || videos[0]

  return {
    photos,
    videos,
    mainImage,
    mainVideo: mainVideo?.path,
  }
}

/**
 * Get gallery array (all photos + videos combined, sorted by order) - client-side
 */
export async function getProjectGalleryClient(project: Photo): Promise<string[]> {
  const media = await getProjectMediaClient(project)
  const allMedia: MediaItem[] = [...media.photos, ...media.videos]

  // Sort by order
  allMedia.sort((a, b) => {
    const orderA = a.order ?? 9999
    const orderB = b.order ?? 9999
    return orderA - orderB
  })

  return allMedia.map((item) => item.path)
}

