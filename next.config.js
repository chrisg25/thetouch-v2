/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["thetouchpublication.site", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
