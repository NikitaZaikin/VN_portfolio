// Theme configuration file - Change colors here to update the entire site
// All color variables are centralized for easy maintenance

export const theme = {
  colors: {
    // Primary colors - Main brand colors
    primary: {
      dark: "#022E4C", // Dark teal - Primary background
      light: "#517493", // Light slate - Secondary
      accent: "#56061D", // Burgundy - Main accent
    },
    // Neutral colors
    neutral: {
      bg: "#0A0E27", // Very dark background
      bgSecondary: "#1A1F3A", // Secondary background
      text: "#E2D9CB", // Cream/beige - Primary text
      textSecondary: "#A8A08F", // Muted text
      border: "#2A2F4A", // Border color
    },
    // Accent colors
    accent: {
      orange: "#FF6B35", // Vibrant orange for CTAs
      success: "#4CAF50",
      warning: "#FFC107",
      error: "#F44336",
    },
  },
  // Spacing scale
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  // Typography
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      serif: "Georgia, serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.5rem",
      "2xl": "2rem",
      "3xl": "3rem",
      "4xl": "4rem",
    },
  },
  // Border radius
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
  },
}

export type Theme = typeof theme
