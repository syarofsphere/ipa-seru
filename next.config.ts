import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration untuk GitHub Pages static export
  // output: "export",
  images: {
    unoptimized: true,
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
