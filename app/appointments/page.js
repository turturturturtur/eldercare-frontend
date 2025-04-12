"use client";

import { useEffect, useState } from "react";
import { fetchAppointments, createAppointment, deleteAppointment } from "../../lib/api";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [form, setForm] = useState({ user_id: "", type: "", details: "" });
    const [loading, setLoading] = useState(false); // 添加加载状态

    useEffect(() => {
        if (form.user_id) {
            loadAppointments();
        }
    }, [form.user_id]); // ✅ 监听 user_id 变化，自动加载数据

    async function loadAppointments() {
        setLoading(true);
        try {
            const data = await fetchAppointments(form.user_id);
            setAppointments(data);
        } catch (error) {
            console.error("加载预约失败", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.user_id || !form.type || !form.details) return; // 确保所有字段已填写
        try {
            await createAppointment(form);
            setForm({ user_id: form.user_id, type: "", details: "" }); // 保留 user_id
            loadAppointments();
        } catch (error) {
            console.error("创建预约失败", error);
        }
    }

    async function handleDelete(appointmentId) {
        if (!window.confirm("确定要取消此预约吗？")) return; // 防止误删
        try {
            await deleteAppointment(appointmentId);
            loadAppointments();
        } catch (error) {
            console.error("删除预约失败", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">预约管理</h1>

            {/* 用户 ID 输入框 */}
            <input
                type="text"
                placeholder="输入用户ID以加载预约"
                value={form.user_id}
                onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* 加载状态 */}
            {loading && <p className="text-gray-500">加载中...</p>}

            {/* 添加预约表单 */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">选择预约类型</option>
                        <option value="医生">医生</option>
                        <option value="护工">护工</option>
                        <option value="服务">服务</option>
                    </select>
                    <input
                        type="text"
                        placeholder="预约详情"
                        value={form.details}
                        onChange={(e) => setForm({ ...form, details: e.target.value })}
                        required
                        className="p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        disabled={!form.user_id || !form.type || !form.details}
                        className={`p-2 rounded-md text-white ${
                            form.user_id && form.type && form.details
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                        添加预约
                    </button>
                </div>
            </form>

            {/* 预约列表 */}
            <ul className="mt-6 space-y-4">
                {appointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-gray-50"
                    >
                        <span className="text-gray-700">{appointment.type} - {appointment.details}</span>
                        <button
                            onClick={() => handleDelete(appointment.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            取消预约
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
