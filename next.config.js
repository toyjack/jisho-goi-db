/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig
