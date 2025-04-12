"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";  // ✅ 加上跳转
import { API_BASE_URL } from "@/lib/api";  // 确保你正确引入这个变量
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("${API_BASE_URL}/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        // ✅ 跳转到验证码填写页面
        router.push(`/verify-code?email=${encodeURIComponent(email)}`);
      } else {
        const data = await res.json();
        alert("发送失败：" + data.detail);
      }
    } catch (err) {
      console.error("请求错误：", err);
      alert("网络错误，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">找回密码</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          输入你的注册邮箱，我们将发送验证码至你的邮箱
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="请输入注册邮箱"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                       text-gray-800 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
            disabled={loading}
          >
            {loading ? "发送中..." : "发送验证码"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <a href="/login" className="text-sky-500 hover:underline">返回登录</a>
        </div>
      </div>
    </div>
  );
}
