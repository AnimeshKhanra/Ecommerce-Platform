import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  turbopack: {
    root: process.cwd(),
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
