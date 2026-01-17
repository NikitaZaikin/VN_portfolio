// Home page - Main landing page with hero, categories, stats, and creators
import { HeroSlider } from "@/components/hero-slider"
import { CategoryCards } from "@/components/category-cards"
import { StatsSection } from "@/components/stats-section"
import { CreatorsSection } from "@/components/creators-section"

export default function Home() {
  return (
    <div>
      {/* Hero Section with Auto-scrolling Slider */}
      <HeroSlider />

      {/* Category Cards Section */}
      <CategoryCards />

      {/* Statistics Section */}
      <StatsSection />

      {/* Creators Section */}
      <CreatorsSection />
    </div>
  )
}
