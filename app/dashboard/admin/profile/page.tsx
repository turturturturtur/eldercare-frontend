"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    setForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      address: currentUser.address || "",
      gender: currentUser.gender || "",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("个人资料已更新!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 tracking-wide">个人资料</h2>

        <div className="flex items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {form.name && form.name[0] ? form.name[0].toUpperCase() : "?"}
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-800">{form.name || "暂无姓名"}</h3>
            <p className="text-base text-gray-600">{form.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="姓名"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="邮箱"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="tel"
              placeholder="电话"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="住址"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                选择性别
              </option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl transition-all"
          >
            {loading ? "更新中..." : "更新资料"}
          </button>
        </form>
      </div>
    </div>
  );
}
