"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");

        if (!userStr) {
            console.warn("⚠️ 未找到用户信息，跳转到登录页");
            router.push("/login");
            return;
        }

        const parsed = JSON.parse(userStr);

        if (!parsed.role) {
            console.warn("⚠️ 未知角色，跳转登录页");
            router.push("/login");
            return;
        }

        if (parsed.role !== "admin") {
            console.warn("⛔ 非管理员，禁止访问 admin 页面，跳转登录");
            router.push("/login");
            return;
        }

        setUser(parsed);
    }, []);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200">
            {/* 侧边栏 */}
            <aside className="w-64 bg-white border-r shadow-md">
                <div className="text-blue-600 font-bold text-2xl p-6 border-b">
                    颐康云 · 社区端
                </div>
                <nav className="p-6 space-y-6 text-gray-700 text-sm">
                    <div>
                        <div className="text-gray-500 font-semibold mb-2">功能导航</div>
                        <ul className="space-y-4">
                            <li>
                                <SidebarButton label="📝 服务需求发布" onClick={() => router.push("/dashboard/admin/post-needs")} />
                            </li>
                            <li>
                                <SidebarButton label="👥 服务者管理" onClick={() => router.push("/dashboard/admin/manage-providers")} />
                            </li>
                            <li>
                                <SidebarButton label="📊 服务反馈统计" onClick={() => router.push("/dashboard/admin/feedback")} />
                            </li>
                            <li>
                                <SidebarButton label="📁 老人信息档案" onClick={() => router.push("/dashboard/admin/elder-info")} />
                            </li>
                            <li>
                                <SidebarButton label="👤 个人资料" onClick={() => router.push("/dashboard/admin/profile")} />
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <div className="text-gray-500 font-semibold mb-2">账户</div>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("user");
                                        router.push("/login");
                                    }}
                                    className="text-lg text-red-600 py-3 px-4 bg-red-50 hover:bg-red-100 rounded-lg transition-all w-full text-left"
                                >
                                    退出登录
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>

            {/* 主内容 */}
            <main className="flex-1 p-10">
                <header className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold text-blue-800">社区管理员控制台</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{user.email}</span>
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold uppercase">
                            {user.name?.[0] || "A"}
                        </div>
                    </div>
                </header>

                {/* 功能卡片 */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card
                        title="📝 老人服务需求发布"
                        desc="收集并发布社区老年人如买菜、维修、理发等生活需求，推动精准服务对接。"
                        onClick={() => router.push("/dashboard/admin/post-needs")}
                    />
                    <Card
                        title="👥 服务者对接管理"
                        desc="管理本社区服务者信息，分配任务，监督服务完成进度与评价反馈。"
                        onClick={() => router.push("/dashboard/admin/manage-providers")}
                    />
                    <Card
                        title="📊 服务反馈与统计"
                        desc="整理服务过程中的评分与意见，及时优化服务内容与平台管理策略。"
                        onClick={() => router.push("/dashboard/admin/feedback")}
                    />
                    <Card
                        title="📁 老年人基础信息档案"
                        desc="建立与维护老年人档案，涵盖联系方式、健康状况与常用服务需求，助力智慧养老。"
                        onClick={() => router.push("/dashboard/admin/elder-info")}
                    />
                    <Card
                        title="✍️ 提交老人服务反馈"
                        desc="为已完成的任务收集老人反馈，提升服务质量，完善服务闭环。"
                        onClick={() => router.push("/dashboard/admin/feedback-create")}
                    />
                    <Card
                        title="👤 个人资料"
                        desc="查看和编辑您的个人资料，包括联系方式和账户设置。"
                        onClick={() => router.push("/dashboard/admin/profile")}
                    />
                </section>
            </main>
        </div>
    );
}

// 统一样式的功能卡片组件
function Card({
    title,
    desc,
    onClick,
}: {
    title: string;
    desc: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:ring-2 hover:ring-blue-400 transition min-h-[180px] flex flex-col justify-between"
        >
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">{title}</h3>
            <p className="text-gray-700 text-base">{desc}</p>
        </div>
    );
}

// 统一样式的侧边栏按钮组件
function SidebarButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left text-lg font-medium py-3 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all hover:shadow-md"
        >
            {label}
        </button>
    );
}
