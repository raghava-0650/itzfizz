import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/itzfizz",
  assetPrefix: "/itzfizz/",
  images: {
    unoptimized: true
  },
};

export default nextConfig;
