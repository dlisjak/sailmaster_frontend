module.exports = {
  i18n: {
    defaultLocale: 'si',
    locales: ['si'],
  },
  domains: [
    {
      // Note: subdomains must be included in the domain value to be matched
      // e.g. www.example.com should be used if that is the expected hostname
      domain: 'thesailmaster.si',
      defaultLocale: 'si',
    },
  ],
  react: { useSuspense: false }
}