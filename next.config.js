module.exports = {
    images: {
      domains: ['profile.line-scdn.net'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*` // Proxy to Backend
        }
      ]
    }
  }