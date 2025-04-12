"use client";

import { useEffect, useState } from "react";
import { fetchHealthData, createHealthData } from "../../lib/api";

export default function Health() {
    const [healthData, setHealthData] = useState([]);
    const [form, setForm] = useState({ user_id: "", heart_rate: "", blood_pressure: "", blood_sugar: "", weight: "", steps: "" });
    const [loading, setLoading] = useState(false); // 加载状态

    useEffect(() => {
        if (form.user_id) {
            loadHealthData();
        }
    }, [form.user_id]); // ✅ 监听 user_id 变化，自动加载数据

    async function loadHealthData() {
        setLoading(true);
        try {
            const data = await fetchHealthData(form.user_id);
            setHealthData(data);
        } catch (error) {
            console.error("加载健康数据失败", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.user_id || !form.heart_rate || !form.blood_pressure || !form.weight) return; // 必填字段校验
        try {
            await createHealthData(form);
            setForm({ user_id: form.user_id, heart_rate: "", blood_pressure: "", blood_sugar: "", weight: "", steps: "" });
            loadHealthData();
        } catch (error) {
            console.error("提交健康数据失败", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">健康数据管理</h1>

            {/* 用户 ID 输入框 */}
            <input
                type="text"
                placeholder="输入用户ID以加载健康数据"
                value={form.user_id}
                onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* 加载状态 */}
            {loading && <p className="text-gray-500">加载中...</p>}

            {/* 健康数据输入表单 */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="number"
                        placeholder="心率"
                        value={form.heart_rate}
                        onChange={(e) => setForm({ ...form, heart_rate: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        placeholder="血压 (120/80)"
                        value={form.blood_pressure}
                        onChange={(e) => setForm({ ...form, blood_pressure: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="number"
                        placeholder="血糖"
                        value={form.blood_sugar}
                        onChange={(e) => setForm({ ...form, blood_sugar: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="体重 (kg)"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="number"
                        placeholder="步数"
                        value={form.steps}
                        onChange={(e) => setForm({ ...form, steps: e.target.value })}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* 提交按钮 */}
                <button
                    type="submit"
                    disabled={!form.user_id || !form.heart_rate || !form.blood_pressure || !form.weight}
                    className={`w-full p-2 rounded-md text-white ${
                        form.user_id && form.heart_rate && form.blood_pressure && form.weight
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    提交健康数据
                </button>
            </form>

            {/* 健康数据列表 */}
            <ul className="mt-6 space-y-4">
                {healthData.length === 0 ? (
                    <p className="text-gray-500">暂无健康数据</p>
                ) : (
                    healthData.map((data) => (
                        <li
                            key={data.id}
                            className="p-4 border rounded-md shadow-sm bg-gray-50"
                        >
                            <span className="text-gray-700">
                                ❤️ 心率: {data.heart_rate} | 💉 血压: {data.blood_pressure} | ⚖️ 体重: {data.weight}kg
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
