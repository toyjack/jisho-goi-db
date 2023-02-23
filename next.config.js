/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archive.wul.waseda.ac.jp',
      },
      {
        protocol: 'https',
        hostname: 'dl.ndl.go.jp',
      },
    ]
  },
}

module.exports = nextConfig
