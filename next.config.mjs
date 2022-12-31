// @ts-check
import { withSuperjson } from 'next-superjson'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
// !process.env.SKIP_ENV_VALIDATION &&
//   (async () => await import('./src/env/server.mjs'))()

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/blogs/:slug*',
        destination: '/users/dreamecho100/creative-works/blog-posts/:slug*',
        permanent: true,
      },
      {
        source: '/users/mazen-mohamed',
        destination: '/users/dreamecho100',
        permanent: true,
      },
      {
        source: '/cg_creative_arts/fractal_tree',
        destination: '/tools/generate-fractal-tree',
        permanent: true,
      },
      {
        source: '/tools/convert_from_markdown_to_html',
        destination: '/tools/convert-from-markdown-to-html',
        permanent: true,
      },
    ]
  },
}

const nextConfig = withSuperjson()(config)

export default nextConfig
