"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";  // 确保你正确引入这个变量
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirm) {
      setMessage("两次输入的密码不一致！");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        code,
        new_password: password,
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setMessage(data.detail || "重置失败，请重试");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold text-center text-blue-600">设置新密码</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="password"
            placeholder="请输入新密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg text-gray-800"
            required
          />
          <input
            type="password"
            placeholder="再次确认新密码"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg text-gray-800"
            required
          />
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600"
          >
            重置密码
          </button>
        </form>

        {message && (
          <p className="text-red-500 text-sm mt-3 text-center">{message}</p>
        )}

        <div className="text-center mt-6 text-sm">
          <a href="/login" className="text-sky-500 hover:underline">返回登录</a>
        </div>
      </div>
    </div>
  );
}
