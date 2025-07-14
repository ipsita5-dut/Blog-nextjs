import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'img.freepik.com',
      'source.unsplash.com',
      'images.pexels.com',
      'www.chitkara.edu.in',
      'media.istockphoto.com',
      'propeltech.co.uk',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables eslint errors during build
  },
};

export default nextConfig;
