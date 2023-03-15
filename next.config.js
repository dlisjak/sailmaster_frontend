const { i18n } = require('./next-i18next.config')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*"
      },
      {
        source: "/static2/:path*",
        destination: "https://api.thesailmaster.si/static2/:path*"
      },
      {
        source: "/media/:path*",
        destination: "https://api.thesailmaster.si/media/:path*"
      },
      {
        source: "/api/:path*",
        destination: "https://api.thesailmaster.si/api/:path*"
      },
      {
        source: "/externalapi/:path*",
        destination: "https://api.thesailmaster.si/externalapi/:path*"
      },
      {
        source: "/admin/:path*",
        destination: "https://api.thesailmaster.si/admin/:path*"
      },
      {
        source: "/dynamic-sitemap.xml",
        destination: "https://api.thesailmaster.si/dynamic-sitemap.xml"
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ws.nausys.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thesailmaster.si',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.thesailmaster.si',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  i18n,
  staticPageGenerationTimeout: 3600 * 4
});