/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'vercel.app',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['danncelink.vercel.app', 'localhost:3000']
    },
    outputFileTracingIncludes: {
      '/api/**/*': ['./lib/**/*'],
    },
    
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,HEAD,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  // Vercel-specific optimizations
  poweredByHeader: false,
  compress: true,
  swcMinify: true
}

module.exports = nextConfig
