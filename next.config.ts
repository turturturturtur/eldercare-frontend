import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 拦截前端请求 /api/xxx
        destination: "http://127.0.0.1:8000/:path*", // 转发到 FastAPI 服务器
      },
    ];
  },
};

export default nextConfig;
