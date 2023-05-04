const { i18n } = require('./next-i18next.config')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/admin/:path*/',
        destination: 'https://api.thesailmaster.si/admin/:path*/',
      },
      {
        source: '/:path*/',
        destination: 'https://api.thesailmaster.si/:path*/',
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