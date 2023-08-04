/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
    serverActions: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archive.wul.waseda.ac.jp',
      },
      {
        protocol: 'https',
        hostname: 'dl.ndl.go.jp',
      },
      {
        protocol: 'https',
        hostname: 'jisho-goi.s3.ap-northeast-1.amazonaws.com',
      },
    ]
  },
}
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
// module.exports = nextConfig
