"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";  // 确保你正确引入这个变量
export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    role: "provider"
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage({ text: "", type: "" });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (!isValidEmail(form.email)) {
      setMessage({ text: "请输入正确的邮箱格式", type: "error" });
      return;
    }
    if (Number(form.age) <= 0) {
      setMessage({ text: "年龄必须大于 0", type: "error" });
      return;
    }

    console.log("🧪 注册提交前密码为：", form.password); // ✅ 明文调试输出

    setLoading(true);
    try {
      const res = await fetch("${API_BASE_URL}/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const role = data.user?.role || "provider";
        const target = role === "admin" ? "/dashboard/admin" : "/dashboard/provider";

        setMessage({ text: "✅ 注册成功，正在跳转...", type: "success" });
        setTimeout(() => router.push(target), 1000);
      } else {
        const data = await res.json();
        console.error("注册失败返回信息：", data);
        setMessage({ text: data.detail || "注册失败", type: "error" });
      }
    } catch (err) {
      console.error("网络错误：", err);
      setMessage({ text: "网络错误，请稍后再试", type: "error" });
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md relative transition-all">

        {/* 提示信息 */}
        {message.text && (
          <div
            className={`absolute -top-14 left-1/2 transform -translate-x-1/2 px-5 py-3 flex items-center space-x-2 text-white text-sm font-semibold rounded-md shadow-md transition-all duration-500
              ${message.type === "success" ? "bg-green-500" : "bg-red-500"}
            `}
          >
            {message.type === "success" ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">创建新账户</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="姓名"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm focus:outline-none text-black"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="年龄"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm focus:outline-none text-black"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="邮箱"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm focus:outline-none text-black"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="电话"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm focus:outline-none text-black"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="密码"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm focus:outline-none text-black"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm focus:outline-none text-black"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option value="provider">服务提供者</option>
            <option value="admin">社区管理员</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold shadow-md transition duration-300 ${loading
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "正在注册..." : "立即注册"}
          </button>
        </form>

        {/* 跳转链接 */}
        <p className="text-center text-sm text-gray-600 mt-6">
          已有账号？{" "}
          <Link href="/login" className="text-blue-500 font-semibold hover:underline">
            去登录
          </Link>
        </p>
        <p className="text-center mt-2">
          <Link href="/" className="text-sm text-gray-400 hover:text-blue-500 hover:underline">
            返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
