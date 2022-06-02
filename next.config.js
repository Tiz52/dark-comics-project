/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["upload.wikimedia.org","res.cloudinary.com"],
  },
};

module.exports = nextConfig;
