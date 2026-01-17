// Helper functions for media type detection

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".MOV", ".MP4", ".WEBM", ".MOV", ".AVI", ".MKV"]

/**
 * Check if a file path is a video
 */
export function isVideoFile(path: string): boolean {
  const lowerPath = path.toLowerCase()
  return VIDEO_EXTENSIONS.some(ext => lowerPath.endsWith(ext.toLowerCase())) || 
         path.includes(".mp4") || 
         path.includes(".mov") || 
         path.includes(".webm")
}

/**
 * Check if a file path is an image
 */
export function isImageFile(path: string): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]
  const lowerPath = path.toLowerCase()
  return imageExtensions.some(ext => lowerPath.endsWith(ext))
}

