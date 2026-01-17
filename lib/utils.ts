import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Base path for GitHub Pages - must match next.config.mjs basePath
export const BASE_PATH = '/VN_portfolio'

/**
 * Adds basePath to a path if it's a relative path (starts with /)
 * Leaves absolute URLs (http/https) and paths that already include basePath unchanged
 */
export function addBasePath(path: string): string {
  if (!path) return path
  
  // Don't modify absolute URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // Don't modify if already includes basePath
  if (path.startsWith(BASE_PATH)) {
    return path
  }
  
  // Add basePath to relative paths
  if (path.startsWith('/')) {
    return `${BASE_PATH}${path}`
  }
  
  // For paths without leading slash, add basePath and slash
  return `${BASE_PATH}/${path}`
}
