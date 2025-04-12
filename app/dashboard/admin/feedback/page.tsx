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

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;
    axios.get<Feedback[]>("/api/feedback/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch(() => {
        alert("❌ 获取反馈失败，请检查登录状态");
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">服务反馈与评价</h2>

        {feedbacks.length === 0 ? (
          <p className="text-gray-600 text-center">暂无反馈数据。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-sm text-gray-500 mb-1">
                  {new Date(fb.created_at).toLocaleDateString()}
                </div>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
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
