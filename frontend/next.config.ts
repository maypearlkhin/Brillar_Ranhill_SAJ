import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Serve /public images directly — avoids Next image optimizer 500s on EC2
  // when sharp/native deps are missing or wrong platform.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
