"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Need {
    title: string;
    address: string;
    time: string;
}

interface Task {
    id: number;
    status: "ongoing" | "completed";
    accepted_at: string;
    need: Need;
}

export default function MyTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

    useEffect(() => {
        if (!token) return;
        axios
            .get<Task[]>("/api/tasks/my", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setTasks(res.data)) // ✅ 现在 res.data 明确是 Task[]
            .catch(() => {
                alert("❌ 获取任务失败，请检查登录状态");
            });
    }, [token]);

    const handleComplete = async (id: number) => {
        try {
            await axios.put(
                `/api/tasks/complete/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, status: "completed" } : task
                )
            );
            alert("✅ 任务已标记为完成！");
        } catch (err: any) {
            alert("❌ 标记失败：" + (err.response?.data?.detail || "未知错误"));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-800 mb-10">我的服务任务</h2>

                {tasks.length === 0 ? (
                    <p className="text-gray-600">暂无任务。</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">{task.need.time}</div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                        {task.need.title}
                                    </h3>
                                    <p className="text-gray-700 mb-2">📍 地址：{task.need.address}</p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        当前状态：{task.status === "completed" ? "已完成" : "进行中"}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleComplete(task.id)}
                                    disabled={task.status === "completed"}
                                    className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold transition-all ${task.status === "completed"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    {task.status === "completed" ? "已完成" : "标记为完成"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
