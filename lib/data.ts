// Sample data for the portfolio - Replace with your actual content
// Images are placeholders - replace with your own URLs

// Media item with optional manual control
export interface MediaItem {
  path: string // Path to the file
  order?: number // Manual order (lower = first). If not set, uses alphabetical order
  isMain?: boolean // If true, this is the main image/video for the project
}

export interface Photo {
  id: string
  title: string
  creator: ("photographer" | "videographer")[]
  category: "fashion" | "cars" | "lifestyle" | "events"
  location: string
  imageUrl: string
  type: "photo" | "video"
  gallery?: string[] // Optional - used as fallback if no folder/manual specified
  
  // New: Automatic folder scanning
  photosFolder?: string // Path to folder with photos (e.g., "/projects/1/photos")
  videosFolder?: string // Path to folder with videos (e.g., "/projects/1/videos")
  
  // New: Manual media control (optional - if not provided, auto-scans folders)
  manualPhotos?: MediaItem[] // Manually specified photos with order
  manualVideos?: MediaItem[] // Manually specified videos with order
}

export interface Creator {
  id: string
  name: string
  role: "photographer" | "videographer"
  bio: string
  imageUrl: string
  socials: {
    instagram?: string
    telegram?: string
    twitter?: string
    email?: string
  }
}

export const portfolioItems: Photo[] = [
  {
    id: "1",
    title: "Fashion Session 1",
    creator: ["photographer"],
    category: "fashion",
    location: "Studio",
    imageUrl: "/fashion-photography.png",
    type: "photo",
    gallery: [
      "/fashion-model-elegant-pose-studio-lighting.jpg",
      "/fashion-portrait-dramatic-shadows.jpg",
      "/fashion-photoshoot-elegant-dress.jpg",
      "/high-fashion-editorial.png",
      "/fashion-model-close-up-portrait.jpg",
    ],
    // Example: Automatic folder scanning
    // photosFolder: "/projects/1/photos", // Will auto-scan this folder
    // {
    //   id: "2",
    //   title: "Car Photoshoot",
    //   manualPhotos: [
    //     { path: "/projects/2/photos/main.jpg", order: 1, isMain: true },
    //     { path: "/projects/2/photos/photo2.jpg", order: 2 },
    //   ],
    // }

  },
  {
    id: "2",
    title: "Car Photoshoot",
    creator: ["photographer","videographer"],
    category: "cars",
    location: "Arena Chishinau - Car meet",
    imageUrl: "/head_carmeet.jpg",
    type: "photo",
    gallery: [
      "/projects/2/photos/IMG_2146.jpg",
      "/projects/2/photos/IMG_2147.jpg",
      "/projects/2/photos/IMG_2148.jpg",
      "/projects/2/photos/IMG_2149.jpg",
      "/projects/2/photos/IMG_2150.jpg",
      "/projects/2/photos/IMG_2151.jpg",
      "/projects/2/photos/IMG_2152.jpg",
      "/projects/2/photos/IMG_2153.jpg",
      "/projects/2/photos/IMG_2984.jpg",
      "/projects/2/photos/IMG_3122.jpg",
      "/projects/2/photos/IMG_3123.jpg",
      "/projects/2/photos/IMG_3124.jpg",
      "/projects/2/photos/IMG_3127.jpg",
      "/projects/2/photos/IMG_3129.jpg",
      "/projects/2/photos/IMG_3133.jpg",
      "/projects/2/photos/IMG_3135.jpg",
    ],
    // photosFolder: "/projects/2/photos", // Not needed for static export - files are in gallery
    // Example: Manual control with order
    // manualPhotos: [
    //   { path: "/head_carmeet.jpg", order: 1, isMain: true },
    //   { path: "/car-detail-shot-wheel-and-body.jpg", order: 2 },
    //   { path: "/red-sports-car-luxury-photography.jpg", order: 3 },
    // ],
    // Or use automatic folder:
    // photosFolder: "/projects/2/photos",
    // {
    //   id: "2",
    //   title: "Car Photoshoot",
    //   photosFolder: "/projects/2/photos",  // Просто укажите папку!
    //   videosFolder: "/projects/2/videos",
    //   // Файлы автоматически подтянутся из папок
    // }
  },
  {
    id: "3",
    title: "Lifestyle Video",
    creator: ["videographer"],
    category: "lifestyle",
    location: "Urban",
    imageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: "video",
    gallery: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "/lifestyle-video-frame-urban-setting.jpg",
      "/cinematic-street-photography-people.jpg",
      "/urban-lifestyle-candid-moment.jpg",
      "/city-life-documentary-style.jpg",
    ],
  },
  {
    id: "4",
    title: "Event Coverage",
    creator: ["videographer"],
    category: "events",
    location: "Studio",
    imageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    type: "video",
    gallery: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "/corporate-event-professional-videography.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "5",
    title: "Fashion Session 2",
    creator: ["photographer"],
    category: "fashion",
    location: "Outdoor",
    imageUrl: "/portrait-fashion.jpg",
    type: "photo",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "6",
    title: "Wedding Highlights",
    creator: ["videographer"],
    category: "events",
    location: "Mini Castle",
    imageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "video",
    gallery: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "7",
    title: "Vintage Car Collection",
    creator: ["photographer"],
    category: "cars",
    location: "Studio",
    imageUrl: "/placeholder.svg?height=600&width=800",
    type: "photo",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "8",
    title: "Street Style Documentary",
    creator: ["videographer"],
    category: "lifestyle",
    location: "Urban",
    imageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    type: "video",
    gallery: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
  },
  {
    id: "9",
    title: "Car Photoshoot",
    creator: ["photographer"],
    category: "cars",
    location: "Ukraine",
    imageUrl: "/projects/9/photos/audi_header.jpg",
    type: "video",
    gallery: [
      "/projects/9/photos/audi_header.jpg",
      "/projects/9/photos/DSC03144.jpg",
      "/projects/9/photos/DSC03149.jpg",
      "/projects/9/photos/DSC03157.jpg",
      "/projects/9/videos/IMG_2725.MOV",
    ],
    // videosFolder: "/projects/9/videos", // Not needed for static export - files are in gallery
    // photosFolder: "/projects/9/photos", // Not needed for static export - files are in gallery
  }
]

// Creator information
export const creators: Creator[] = [
  {
    id: "1",
    name: "Nadya",
    role: "videographer",
    bio: "Passionate about capturing authentic moments and timeless aesthetics. Specializing in fashion and lifestyle photography.",
    imageUrl: "/professional-photographer.png",
    socials: {
      instagram: "https://www.instagram.com/nadiia_frame/",
      telegram: "https://telegram.org",
      twitter: "https://twitter.com",
      email: "alex@example.com",
    },
  },
  {
    id: "2",
    name: "Viktoria",
    role: "photographer",
    bio: "Creative videographer with a passion for storytelling. Expert in event coverage and cinematic lifestyle content.",
    imageUrl: "/professional-videographer.png",
    socials: {
      instagram: "https://www.instagram.com/s.viktoria.s/",
      telegram: "https://telegram.org",
      email: "maria@example.com",
    },
  },
]

// Statistics data
export const statistics = [
  { label: "Photoshoots", value: "150+" },
  { label: "Projects", value: "500+" },
  { label: "Videos", value: "20K+" },
  { label: "Clients", value: "50+" },
]

// Category interface
export interface Category {
  id: string
  name: string
  icon: string
  description: string
  imageUrl?: string // Optional: main image for the category. If not provided, will use random image from projects
}

// Categories with random images from the portfolio
export const categories: Category[] = [
  {
    id: "1",
    name: "Fashion",
    icon: "👗",
    description: "High-fashion and lifestyle portraits",
  },
  {
    id: "2",
    name: "Cars",
    icon: "🚗",
    description: "Automotive photography and cinematography",
  },
  {
    id: "3",
    name: "Lifestyle",
    icon: "✨",
    description: "Candid moments and everyday beauty",
  },
  {
    id: "4",
    name: "Events",
    icon: "🎬",
    description: "Corporate and special event coverage",
  },
  {
    id: "5",
    name: "Food",
    icon: "🍔",
    description: "Food photography and videography",
    imageUrl: "/car-detail-shot-wheel-and-body.jpg",
  },
  {
    id: "6",
    name: "Drinks",
    icon: "🍺",
    description: "Drinks photography and videography",
  },
]
