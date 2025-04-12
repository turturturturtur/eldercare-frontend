import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true, // ✅ 开启 App Router 支持
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
