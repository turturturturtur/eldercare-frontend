"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface ServiceNeed {
    id: number;
    title: string;
    description: string;
    address: string;
    time: string;
    status: string;
}

export default function AvailableTasksPage() {
    const [tasks, setTasks] = useState<ServiceNeed[]>([]);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : "";

    useEffect(() => {
        axios
            .get<ServiceNeed[]>("/api/needs/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setTasks(res.data))
            .catch((err) => {
                console.error("❌ 获取任务失败：", err);
                alert("获取失败，请检查登录状态或后端服务");
            });
    }, []);

    const handleAccept = async (needId: number) => {
        try {
            await axios.post(
                "/api/tasks/",
                { need_id: needId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("✅ 接单成功！");
            setTasks((prev) => prev.filter((task) => task.id !== needId)); // 接单后移除
        } catch (err: any) {
            alert("❌ 接单失败：" + err.response?.data?.detail);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-800 mb-10">📋 可接服务列表</h2>

                {tasks.length === 0 ? (
                    <p className="text-gray-600">暂无可用任务。</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                        {task.title}
                                    </h3>
                                    <p className="text-gray-700 mb-2">{task.description}</p>
                                    <p className="text-sm text-gray-500">📍 {task.address}</p>
                                    <p className="text-sm text-gray-500">🕒 {task.time}</p>
                                </div>

                                <button
                                    onClick={() => handleAccept(task.id)}
                                    className="mt-4 px-4 py-2 rounded-lg text-white font-semibold transition-all bg-blue-600 hover:bg-blue-700"
                                >
                                    接单
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
