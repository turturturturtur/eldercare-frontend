"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {API_BASE_URL} from "@/lib/api";  // 确保你正确引入这个变量
export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr || userStr === "undefined") return;

    try {
      const user = JSON.parse(userStr);
      const role = user.role || "provider";
      const destination = role === "admin" ? "/dashboard/admin" : "/dashboard/provider";
      router.push(destination);
    } catch (err) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage({ text: "", type: "" });

    if (!isValidEmail(form.email)) {
      setMessage({ text: "邮箱格式不正确", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          }));
        }

        setMessage({ text: "登录成功！正在跳转...", type: "success" });

        const role = data.user?.role || "provider";
        const destination = role === "admin" ? "/dashboard/admin" : "/dashboard/provider";

        setTimeout(() => {
          router.push(destination);
        }, 500);
      } else {
        const error = await res.json();
        setMessage({ text: error?.detail || "登录失败，账号或密码错误", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "网络错误，请稍后再试", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4 relative">
      
      {/* 🔙 返回主页按钮 */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-sm bg-white text-blue-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition z-10"
      >
        ← 返回主页
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        {message.text && (
          <div
            className={`absolute top-[-3rem] left-1/2 -translate-x-1/2 px-6 py-2 rounded-md text-white font-medium shadow-md transition-all duration-500 ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <h2 className="text-3xl font-extrabold text-blue-600 text-center mb-6 tracking-wide">
          颐康云账号登录
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="请输入邮箱"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="请输入密码"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-sky-500 text-white py-2 rounded-lg font-semibold transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-600 hover:shadow-lg"
            }`}
          >
            {loading ? "正在登录..." : "登录"}
          </button>
        </form>

        <div className="text-right mt-2 text-sm">
          <a href="/forgot-password" className="text-sky-500 hover:underline">
            忘记密码？
          </a>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          还没有账号？{" "}
          <a href="/register" className="text-sky-600 hover:underline font-medium">
            前往注册
          </a>
        </p>
      </div>
    </div>
  );
}
