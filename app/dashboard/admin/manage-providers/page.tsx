"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Provider {
  id: number;
  name: string;
  phone: string;
  age: number;
  serviceCount: number;
  averageRating: number;
}

interface Task {
  id: number;
  accepted_at: string;
  status: string;
  need: {
    title: string;
  };
}

interface Feedback {
  id: number;
  elder_name: string;
  comment: string;
  rating: number;
  created_at: string;
}

export default function ManageProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selected, setSelected] = useState<Provider | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchDetails = async (providerId: number) => {
    try {
      const taskRes = await axios.get<Task[]>(`/api/tasks/by-provider/${providerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(taskRes.data);

      const fbRes = await axios.get<Feedback[]>(`/api/feedback/by-provider/${providerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(fbRes.data);
    } catch (err) {
      console.error("❌ 获取详情失败", err);
    }
  };

  const fetchProviders = () => {
    axios
      .get<Provider[]>(`/api/users/?role=provider`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProviders(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("❌ 获取服务者失败", err);
        setProviders([]);
      });
  };

  const handleDelete = (id: number) => {
    const confirmed = confirm("确定删除该服务者吗？");
    if (!confirmed) return;

    axios
      .delete(`/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert("✅ 删除成功");
        fetchProviders();
        setSelected(null);
      })
      .catch(() => alert("❌ 删除失败"));
  };

  const handleView = (p: Provider) => {
    setSelected(p);
    fetchDetails(p.id);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-10">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">服务者对接管理</h2>

        <table className="w-full border-collapse text-left">
          <thead className="bg-blue-50">
            <tr className="text-base text-gray-700">
              <th className="p-3">姓名</th>
              <th className="p-3">联系方式</th>
              <th className="p-3">年龄</th>
              <th className="p-3">服务次数</th>
              <th className="p-3">评分均值</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 text-[15px] text-gray-800">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.phone}</td>
                <td className="p-3">{p.age}</td>
                <td className="p-3">{p.serviceCount}</td>
                <td className="p-3">{p.averageRating?.toFixed(1) || "-"}</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => handleView(p)}
                    className="text-blue-600 font-bold hover:underline"
                  >查看</button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 font-bold hover:underline"
                  >删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">服务者详情</h3>
            <div className="text-gray-700 space-y-2 mb-6 text-base">
              <p><strong>姓名：</strong>{selected.name}</p>
              <p><strong>电话：</strong>{selected.phone}</p>
              <p><strong>年龄：</strong>{selected.age}</p>
              <p><strong>服务次数：</strong>{selected.serviceCount}</p>
              <p><strong>平均评分：</strong>{selected.averageRating?.toFixed(1) || "-"}</p>
            </div>

            <h4 className="text-xl font-bold text-blue-600 mb-2">📋 接单记录</h4>
            <ul className="mb-6 space-y-2">
              {tasks.map((t) => (
                <li key={t.id} className="bg-gray-50 p-3 rounded text-sm">
                  <strong>{t.need.title}</strong>（{t.status === "done" ? "已完成" : "进行中"}） - 接单时间：{new Date(t.accepted_at).toLocaleString()}
                </li>
              ))}
              {tasks.length === 0 && <p className="text-gray-500">暂无任务</p>}
            </ul>

            <h4 className="text-xl font-bold text-blue-600 mb-2">⭐ 评价记录</h4>
            <ul className="space-y-2">
              {feedbacks.map((fb) => (
                <li key={fb.id} className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-500">{fb.created_at.slice(0, 10)} 来自 {fb.elder_name}</div>
                  <div className="font-medium text-gray-700 text-sm">“{fb.comment}”</div>
                  <div className="text-yellow-500">
                    {Array.from({ length: fb.rating }).map((_, i) => <span key={i}>★</span>)}
                    {Array.from({ length: 5 - fb.rating }).map((_, i) => <span key={i}>☆</span>)}
                  </div>
                </li>
              ))}
              {feedbacks.length === 0 && <p className="text-gray-500">暂无评价</p>}
            </ul>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelected(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
