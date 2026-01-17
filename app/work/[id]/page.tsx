// Project detail page - Server component wrapper for static export
import { portfolioItems } from "@/lib/data"
import { ProjectPageClient } from "./project-page-client"

// Generate static params for all projects (required for static export)
export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    id: item.id,
  }))
}

export default function ProjectPage() {
  return <ProjectPageClient />
}
