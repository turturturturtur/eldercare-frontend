"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PostNeedsPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    elderName: "",
    serviceType: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // ✅ 注意字段是 "token"，不是 "access_token"

    if (!token) {
      alert("请先登录再操作！");
      router.push("/login");
      return;
    }

    console.log("🔐 当前 token：", token); // ✅ 用于调试

    try {
      await axios.post(
        "/api/needs/",
        {
          title: form.serviceType,
          description: form.description,
          address: "由社区自动填写",
          time: "待定",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Bearer 不能缺
          },
        }
      );

      setSubmitted(true);
      setForm({ elderName: "", serviceType: "", description: "" });
      setTimeout(() => setSubmitted(false), 2000);
    } catch (err: any) {
      alert("❌ 发布失败：" + (err.response?.data?.detail || "未知错误"));
    }
  };

  const handleBack = () => {
    router.push("/dashboard/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8 flex items-center justify-center relative">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-sm font-semibold"
      >
        返回控制台
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          📝 发布服务需求
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="老人姓名"
            value={form.elderName}
            onChange={(e) => setForm({ ...form, elderName: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-base font-medium text-gray-800"
          />
          <input
            type="text"
            placeholder="服务类型（如理发、修理）"
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-base font-medium text-gray-800"
          />
          <textarea
            placeholder="详细描述（时间、地点、注意事项）"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-base font-medium text-gray-800"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            提交需求
          </button>
        </form>

        {submitted && (
          <p className="text-green-600 font-semibold mt-4 text-center">
            ✅ 需求发布成功！
          </p>
        )}
      </div>
    </div>
  );
}
