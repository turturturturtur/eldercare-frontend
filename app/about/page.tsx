"use client";

import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* ✅ 这里加返回按钮 */}
      <div className="absolute top-6 left-6 z-50">
        <a
          href="/"
          className="flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg shadow transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">返回首页</span>
        </a>
      </div>
      {/* 页面头部 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-20 shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">关于我们</h1>
        <p className="mt-4 text-lg md:text-xl text-white/90">
          昊门团队 · 用科技赋能智慧养老 ✨
        </p>
      </section>

      {/* 团队介绍 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">我们是谁？</h2>
          <p className="mt-6 text-gray-600 leading-relaxed text-lg">
            昊门团队是一支充满热情与创造力的跨学科学生团队，专注于“智慧养老”技术的研究与产品开发。
            我们汇聚来自计算机、人工智能、医学、交互设计等多个领域的成员，依托高校科研优势，持续探索“科技助老”的创新路径。
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed text-lg">
            目前，我们正开发一套基于 <strong>健康监测、多模态感知、智能预约与紧急响应</strong> 的综合养老服务平台，
            期望真正做到“让科技照亮银发生活”，为构建老龄友好型社会贡献力量。
          </p>
        </div>
      </section>

      {/* 团队成员 */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">团队成员</h2>

          <div className="flex flex-wrap justify-center gap-10">
            {/* 成员1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-72 hover:shadow-xl transition">
              <Image
                src="/avatar1.jpg"
                alt="钮天乐"
                width={128}
                height={128}
                className="w-32 h-32 mx-auto rounded-full object-cover shadow"
              />
              <h3 className="mt-5 text-xl font-semibold text-gray-700">钮天乐</h3>
              <p className="text-blue-500 font-medium">计算机视觉工程师</p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                专注多模态识别与智能体模型开发，致力于将 AI 融入养老场景，提升服务智能化与温度。
              </p>
            </div>

            {/* 成员2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-72 hover:shadow-xl transition">
              <Image
                src="/avatar2.jpg"
                alt="团队成员"
                width={128}
                height={128}
                className="w-32 h-32 mx-auto rounded-full object-cover shadow"
              />
              <h3 className="mt-5 text-xl font-semibold text-gray-700">核心开发者</h3>
              <p className="text-blue-500 font-medium">后端架构 & 系统设计</p>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                构建稳定的服务端架构与数据系统，确保平台的高可用与高安全。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold">我们正在寻找志同道合的你！</h3>
          <p className="mt-4 text-white/90 text-lg">
            如果你也热爱技术、关心养老，欢迎加入我们，一起共创未来。
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            联系我们
          </a>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>&copy; 2025 昊门团队. 版权所有</p>
      </footer>
    </main>
  );
}
