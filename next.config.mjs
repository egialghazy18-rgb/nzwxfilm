/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://vidsrc.sh https://www.2embed.cc https://multiembed.mov;",
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
