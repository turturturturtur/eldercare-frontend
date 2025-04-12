"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Feedback {
  id: number;
  elder_name: string;
  comment: string;
  rating: number;
  created_at: string;
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8000/api/feedback/mine", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFeedbacks(res.data as Feedback[]);
      })
      .catch(() => {
        alert("❌ 获取反馈失败，请检查登录状态");
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">
          服务反馈与评价
        </h2>

        {loading ? (
          <p className="text-gray-600">加载中...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-600">暂无服务反馈记录。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="mb-2 text-sm text-gray-500">
                  {new Date(fb.created_at).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  来自 {fb.elder_name} 的反馈
                </h3>
                <p className="text-gray-800 mb-4">“{fb.comment}”</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: fb.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {Array.from({ length: 5 - fb.rating }).map((_, i) => (
                    <span key={i}>☆</span>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">
                    {fb.rating} 分
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
