/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    domains: ["tailwindui.com"],
  },
};

module.exports = nextConfig;
