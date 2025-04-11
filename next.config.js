/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    // Enable image optimization for production
    unoptimized: process.env.NODE_ENV === 'development',
    // Allow images from your domain and vercel deployment
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // Improve performance
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Compression
  compress: true,
};

module.exports = nextConfig;
