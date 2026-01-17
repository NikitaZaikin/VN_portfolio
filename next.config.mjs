/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/VN_portfolio', // GitHub Pages repository name
  assetPrefix: '/VN_portfolio', // GitHub Pages repository name
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
