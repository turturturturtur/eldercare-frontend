"use client";

import { useEffect, useState } from "react";

export default function ProviderProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    setForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      serviceType: currentUser.serviceType || "",
      address: currentUser.address || "",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("资料已更新（模拟保存）！");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-10 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 tracking-wide">
          服务者个人资料
        </h2>

        <div className="flex items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {form.name ? form.name[0].toUpperCase() : "P"}
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {form.name || "暂无姓名"}
            </h3>
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
              placeholder="服务区域地址"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <select
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                选择服务类型
              </option>
              <option value="repair">维修类</option>
              <option value="shopping">代买类</option>
              <option value="accompany">陪护类</option>
              <option value="other">其他</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-xl transition-all"
          >
            {loading ? "保存中..." : "保存资料"}
          </button>
        </form>
      </div>
    </div>
  );
}
