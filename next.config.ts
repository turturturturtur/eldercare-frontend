import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ 忽略构建时 ESLint 错误
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://eldercare-backend-lx2v.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
