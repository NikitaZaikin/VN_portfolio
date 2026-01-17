// API route for scanning media folders (server-side only)
import { NextRequest, NextResponse } from "next/server"
import { readdir } from "fs/promises"
import { join } from "path"

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".avi", ".mkv"]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const folderPath = searchParams.get("folder")
  const fileType = searchParams.get("type") || "both" // "images", "videos", or "both"

  if (!folderPath) {
    return NextResponse.json({ error: "Folder path is required" }, { status: 400 })
  }

  // Remove leading slash if present
  const cleanPath = folderPath.startsWith("/") ? folderPath.slice(1) : folderPath
  const fullPath = join(process.cwd(), "public", cleanPath)

  try {
    const files = await readdir(fullPath)
    const extensions =
      fileType === "images"
        ? IMAGE_EXTENSIONS
        : fileType === "videos"
          ? VIDEO_EXTENSIONS
          : [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS]

    const mediaFiles = files
      .filter((file) => {
        const ext = file.toLowerCase().substring(file.lastIndexOf("."))
        return extensions.includes(ext)
      })
      .map((file) => `/${cleanPath}/${file}`)
      .sort() // Alphabetical by default

    return NextResponse.json({ files: mediaFiles })
  } catch (error) {
    console.error(`Error scanning folder ${folderPath}:`, error)
    return NextResponse.json(
      { error: `Could not scan folder: ${folderPath}` },
      { status: 500 }
    )
  }
}

