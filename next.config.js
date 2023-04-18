/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  compiler: {
    styledComponents: true,
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
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
// module.exports = nextConfig
