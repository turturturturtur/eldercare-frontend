"use client";

import { useState } from "react";

interface HistoryItem {
  id: number;
  title: string;
  elderName: string;
  address: string;
  time: string;
  comment: string;
  rating: number;
}

export default function HistoryPage() {
  const [records] = useState<HistoryItem[]>([
    {
      id: 1,
      title: "代买药品",
      elderName: "赵大爷",
      address: "康宁小区 8 栋",
      time: "2025-04-01 上午 10:00",
      comment: "很贴心，帮我买了所有需要的药，感谢。",
      rating: 5,
    },
    {
      id: 2,
      title: "陪同理发",
      elderName: "刘奶奶",
      address: "颐康苑 3 单元",
      time: "2025-03-28 下午 2:30",
      comment: "人很好，很细心。",
      rating: 4,
    },
    {
      id: 3,
      title: "上门修理电视",
      elderName: "孙爷爷",
      address: "银发家园 6 栋 501",
      time: "2025-03-20 上午 9:00",
      comment: "修得很快，态度也很好。",
      rating: 5,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">
          历史服务记录
        </h2>

        {records.length === 0 ? (
          <p className="text-gray-600">暂无历史记录。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {records.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {item.time}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    👴 服务对象：{item.elderName}
                  </p>
                  <p className="text-gray-700 mb-1">📍 地址：{item.address}</p>
                  <p className="text-gray-700 mb-2">📝 评价：{item.comment}</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {Array.from({ length: 5 - item.rating }).map((_, i) => (
                      <span key={i}>☆</span>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">
                      {item.rating} 分
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
