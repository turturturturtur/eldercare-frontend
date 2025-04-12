'use client';

import Link from "next/link";
import { HeartPulse, CalendarCheck, AlarmClock, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { logout } from "@/app/utils/auth"; // ✅ 引入封装好的退出函数

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth() as { user: { name: string } | null };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* 导航栏 */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <img
                src="/logo.png"
                className="h-11 w-11 object-contain brightness-125 drop-shadow-md"
                alt="Logo"
              />
              <span
                className={`text-xl font-bold ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                颐康云
              </span>
            </Link>
          </div>

          {/* 桌面导航菜单 */}
          <ul
            className={`hidden md:flex space-x-6 font-sans ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            <li>
              <Link href="/" className="hover:text-blue-500 transition">首页</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500 transition">关于我们</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition">服务</Link>
            </li>
            <li>
              <Link href="/appointments" className="hover:text-blue-500 transition">预约</Link>
            </li>
          </ul>

          {/* 登录或头像区 */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(timeoutId);
                setIsMenuOpen(true);
              }}
              onMouseLeave={() => {
                timeoutId = setTimeout(() => setIsMenuOpen(false), 150);
              }}
            >
              <div className="flex items-center space-x-3 cursor-pointer">
                <img
                  src="/avatar.svg"
                  className="w-8 h-8 rounded-full border border-white"
                  alt="用户头像"
                />
                <span className={`font-semibold ${isScrolled ? "text-gray-800" : "text-white"}`}>
                  欢迎你，{user?.name}
                </span>
              </div>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  <Link href="/dashboard">
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      控制台
                    </span>
                  </Link>
                  {/* <Link href="/settings">
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      设置
                    </span>
                  </Link> */}
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <span
                className={`ml-6 px-4 py-2 rounded-lg font-semibold transition duration-300 cursor-pointer ${
                  isScrolled
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white text-blue-600 hover:bg-gray-100"
                }`}
              >
                登录
              </span>
            </Link>
          )}

          {/* 移动端汉堡按钮 */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 移动端菜单 */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-gray-700">
            <Link href="/">首页</Link><br />
            <Link href="/about">关于我们</Link><br />
            <Link href="/services">服务</Link><br />
            <Link href="/appointments">预约</Link><br />
            <Link href="/login">
              <span className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
                登录
              </span>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero 头部 */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold">智能养老，关爱每一天</h2>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              我们致力于提供便捷、安全、高效的养老服务
            </p>
            <Link href="/register">
              <span className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 cursor-pointer">
                立即注册
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-0"
          >
            <img src="/illustration.svg" alt="养老插图" className="w-[300px] md:w-[400px]" />
          </motion.div>
        </div>
      </section>

      {/* 服务介绍 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800">我们的服务</h3>
          <p className="text-gray-600 mt-4">我们提供全面的养老健康管理解决方案</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform"
            >
              <HeartPulse className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold text-gray-700">健康监测</h4>
              <p className="text-gray-600 mt-2 text-center">实时记录健康数据，智能分析健康状况</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform"
            >
              <CalendarCheck className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold text-gray-700">预约管理</h4>
              <p className="text-gray-600 mt-2 text-center">轻松预约医生、护理人员或日常服务</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform"
            >
              <AlarmClock className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold text-gray-700">紧急求助</h4>
              <p className="text-gray-600 mt-2 text-center">一键紧急呼叫，确保安全无忧</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA 注册召唤区 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold leading-snug">
              加入我们，开启智慧养老新体验
            </h3>
            <p className="mt-4 text-lg text-white/90">
              探索智能健康、预约服务与安心看护的全新方式
            </p>
            <Link href="/register">
              <span className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 animate-pulse">
                立即注册
              </span>
            </Link>
          </div>

          <div>
            <img
              src="/healthcare.svg"
              alt="智慧养老插图"
              className="w-[280px] md:w-[360px]"
            />
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>&copy; 2025 养老服务平台. 版权所有</p>
      </footer>
    </main>
  );
}
