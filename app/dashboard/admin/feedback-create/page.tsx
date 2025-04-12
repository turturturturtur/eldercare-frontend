"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  need: {
    title: string;
  };
}

export default function FeedbackCreatePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [elderName, setElderName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks/completed", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data as Task[]))
      .catch(() => alert("❌ 获取任务失败，请检查登录状态"));
  }, []);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskId) {
      alert("请选择任务");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/feedback/${selectedTaskId}`,
        { elder_name: elderName, comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmitted(true);
      setElderName("");
      setComment("");
      setRating(5);
      setSelectedTaskId(null);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      alert("❌ 提交失败：" + (err.response?.data?.detail || "未知错误"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          ✍️ 提交服务反馈
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">选择任务</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              value={selectedTaskId || ""}
              onChange={(e) => setSelectedTaskId(Number(e.target.value))}
              required
            >
              <option value="" disabled>
                请选择任务标题
              </option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.need?.title || `任务 #${task.id}`}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="老人姓名"
            value={elderName}
            onChange={(e) => setElderName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="请输入服务评价（不少于 10 字）"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            minLength={10}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">评分（1-5 星）</label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            提交反馈
          </button>
        </form>

        {submitted && (
          <p className="text-green-600 font-semibold mt-4 text-center">
            ✅ 反馈提交成功！
          </p>
        )}
      </div>
    </div>
  );
}
