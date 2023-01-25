const { i18n } = require('./next-i18next.config')

module.exports = {
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
  i18n
}