const withMDX = require('@next/mdx')({
  // Optionally provide remark and rehype plugins
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
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
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
}

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
