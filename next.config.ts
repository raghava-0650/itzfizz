import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/itzfizz",
  assetPrefix: "/itzfizz",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig;
