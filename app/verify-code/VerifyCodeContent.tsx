'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";  // 确保你正确引入这个变量
export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromQuery);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/auth/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    if (res.ok) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}&code=${code}`);
    } else {
      const data = await res.json();
      setMessage(data.detail || "验证码错误");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center text-blue-600">验证邮箱验证码</h2>
        <form onSubmit={handleVerify} className="space-y-4 mt-4">
          <input
            type="email"
            placeholder="注册邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg text-gray-800"
            required
          />
          <input
            type="text"
            placeholder="验证码（6位数字）"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg text-gray-800"
            required
          />
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600"
          >
            验证
          </button>
        </form>

        {message && (
          <p className="text-red-500 text-sm mt-3 text-center">{message}</p>
        )}

        <div className="text-center mt-6 text-sm">
          <a href="/forgot-password" className="text-sky-500 hover:underline">
            返回重新获取验证码
          </a>
        </div>
      </div>
    </div>
  );
}
