/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
