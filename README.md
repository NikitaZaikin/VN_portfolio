# DVSY - Photography & Videography Portfolio

A modern, fully responsive SPA (Single Page Application) portfolio for photographers and videographers built with Next.js, React, TypeScript, and Framer Motion.

## Features

- **Multi-language Support**: English, Ukrainian, and Romanian with instant language switching throughout the entire application
- **Smooth Animations**: Powered by Framer Motion for fluid, modern interactions
- **Responsive Design**: Mobile-first approach with beautiful layouts on all devices
- **Project Gallery**: Dynamic portfolio grid with filtering by creator, location, and category
- **Project Detail Pages**: Individual pages for each project with full information
- **Auto-scrolling Components**: Hero slider and category carousel with manual controls
- **Modern Design**: Dark theme with burgundy and orange accents inspired by your mockups
- **Fully Customizable**: Centralized theme configuration for easy color and styling changes

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── works/
│   │   └── page.tsx            # Portfolio grid with filters
│   ├── work/[id]/
│   │   └── page.tsx            # Project detail page
│   ├── about/
│   │   └── page.tsx            # About studio page
│   └── contact/
│       └── page.tsx            # Contact information page
├── components/
│   ├── header.tsx              # Navigation with language switcher
│   ├── footer.tsx              # Footer with social links
│   ├── hero-slider.tsx         # Auto-scrolling hero section
│   ├── category-cards.tsx      # Category carousel
│   ├── stats-section.tsx       # Portfolio statistics
│   └── creators-section.tsx    # Creator profiles
├── lib/
│   ├── theme.ts                # Centralized color and design tokens
│   ├── i18n.ts                 # Translations (EN, UK, RO)
│   └── data.ts                 # Portfolio data and creators info
├── hooks/
│   └── useLanguage.ts          # Language state management
└── public/                      # Static assets and images
```

## Customization Guide

### Colors & Theme
Edit `lib/theme.ts` to change the entire site's color scheme instantly:
```typescript
colors: {
  primary: { dark: "#022E4C", light: "#517493", accent: "#56061D" },
  neutral: { bg: "#0A0E27", bgSecondary: "#1A1F3A", ... },
  accent: { orange: "#FF6B35", ... }
}
```

### Portfolio Data
Replace placeholder content in `lib/data.ts`:
- `portfolioItems`: Add your photos and videos
- `creators`: Update photographer and videographer info
- `categories`: Customize work categories

### Translations
Add or update text in `lib/i18n.ts`:
- `uk`: Ukrainian translations
- `en`: English translations
- `ro`: Romanian translations

### Images
Replace placeholder images in:
- `public/` directory
- Update image URLs in `lib/data.ts`

## Pages Overview

- **Home** (`/`): Hero slider, category cards, statistics, creator profiles
- **Works** (`/works`): Portfolio grid with multi-filter functionality
- **Work Detail** (`/work/[id]`): Full project information with images
- **About** (`/about`): Studio story, advantages, team information
- **Contact** (`/contact`): Contact information, work locations, service capabilities

## Key Features Explained

### Multi-language Support
- Language selection is persistent (stored in localStorage)
- All content changes instantly across the entire SPA
- Currently supports: English (EN), Ukrainian (UK), Romanian (RO)

### Portfolio Filtering
Filter projects by:
- **Creator**: Photographer or Videographer
- **Location**: Studio, Mini Castle, Urban, Outdoor, etc.
- **Category**: Fashion, Cars, Lifestyle, Events

Multiple filters can be combined for precise results.

### Animations
All components use Framer Motion for smooth animations:
- Slide transitions with opacity fades
- Hover effects on cards and buttons
- Staggered children animations
- Smooth menu transitions

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Deployment

### To GitHub Pages
1. Убедитесь, что в `next.config.mjs` указан правильный `basePath` (должен совпадать с названием вашего репозитория)
2. В настройках репозитория GitHub (`Settings` → `Pages`):
   - Source: выберите `GitHub Actions`
3. Закоммитьте и запушьте изменения в ветку `main`
4. GitHub Actions автоматически соберет и задеплоит сайт
5. Сайт будет доступен по адресу: `https://ваш-username.github.io/VN_portfolio/`

### To Vercel
1. Click the "Publish" button in the top right of v0
2. Connect your GitHub repository
3. Deploy automatically on every push

### Local Development
```bash
npm install
npm run dev
```


Built with v0.app for DVSY Photography & Videography
