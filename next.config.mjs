/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://vidsrc.me https://vidsrc.to https://www.2embed.cc https://multiembed.mov https://embed.su https://player.autoembed.cc;",
          },
        ],
      },
    ];
  },
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default nextConfig;
