import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  allowedDevOrigins: ['76.13.98.118'],
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'http://76.13.98.118:8000/:path*',
      },
    ]
  },
};

export default nextConfig;
