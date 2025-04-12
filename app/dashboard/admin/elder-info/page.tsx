"use client";

import { useEffect, useState } from "react";

export default function ElderInfoPage() {
  const [elders, setElders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 替换为后端接口，获取老人信息
    setTimeout(() => {
      setElders([
        { id: 1, name: "王大爷", age: 78, address: "社区 5 号楼 302", contact: "139****8888" },
        { id: 2, name: "李奶奶", age: 82, address: "社区 3 号楼 201", contact: "138****6666" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">老人信息档案</h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">正在加载中...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {elders.map((elder) => (
            <div
              key={elder.id}
              className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-2xl transition-all duration-300 hover:ring-2 hover:ring-blue-400"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{elder.name}</h3>
              <p className="text-gray-600 mb-2">年龄：{elder.age} 岁</p>
              <p className="text-gray-600 mb-2">住址：{elder.address}</p>
              <p className="text-gray-600">联系方式：{elder.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
