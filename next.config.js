
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add path aliases
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
