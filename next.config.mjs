/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '', // leave empty unless a specific port is needed
        pathname: '/**', // match all paths
      },
    ],
  },
};

export default nextConfig;
