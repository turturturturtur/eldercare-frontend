"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProviderDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(userStr);
      if (parsed.role !== "provider") {
        router.push("/dashboard/admin");
        return;
      }
      setUser(parsed);
    } catch (err) {
      router.push("/login");
    }
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        正在加载，请稍候...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r shadow-md">
        <div className="text-blue-600 font-bold text-2xl p-6 border-b">
          颐康云 · 服务端
        </div>
        <nav className="p-6 space-y-6 text-gray-700 text-sm">
          <div>
            <div className="text-gray-500 font-semibold mb-2">功能导航</div>
            <ul className="space-y-4">
              <li>
                <SidebarButton label="📋 可接服务列表" onClick={() => router.push("/dashboard/provider/available-tasks")} />
              </li>
              <li>
                <SidebarButton label="🛠 我的服务任务" onClick={() => router.push("/dashboard/provider/my-tasks")} />
              </li>
              <li>
                <SidebarButton label="⭐ 服务反馈与评价" onClick={() => router.push("/dashboard/provider/feedback")} />
              </li>
              <li>
                <SidebarButton label="👤 个人资料管理" onClick={() => router.push("/dashboard/provider/profile")} />
              </li>
              <li>
                <SidebarButton label="📜 历史服务记录" onClick={() => router.push("/dashboard/provider/history")} />
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

      {/* 主内容区 */}
      <main className="flex-1 p-10">
        <header className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-blue-800">服务者控制台</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">{user.email}</span>
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
              {user.name?.[0]?.toUpperCase() || "P"}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            title="📋 可接服务列表"
            desc="浏览社区发布的老人需求任务，选择合适的服务并接单。"
            onClick={() => router.push("/dashboard/provider/available-tasks")}
          />
          <Card
            title="🛠 我的服务任务"
            desc="查看你已接单的服务，按时间和状态进行管理。"
            onClick={() => router.push("/dashboard/provider/my-tasks")}
          />
          <Card
            title="⭐ 服务反馈与评价"
            desc="查看居民对你的服务评分，也可以提交服务反馈建议。"
            onClick={() => router.push("/dashboard/provider/feedback")}
          />
          <Card
            title="👤 个人资料管理"
            desc="编辑你的服务者信息，包括服务类型、联系方式等。"
            onClick={() => router.push("/dashboard/provider/profile")}
          />
          <Card
            title="📜 历史服务记录"
            desc="查看你过往完成的服务任务，了解服务频率与收入概况。"
            onClick={() => router.push("/dashboard/provider/history")}
          />
        </div>
      </main>
    </div>
  );
}

// 卡片组件（扩大面积，统一风格）
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

// 侧边栏按钮组件（统一样式）
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
