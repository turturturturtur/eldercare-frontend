// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";  // 确保你正确引入这个变量

export interface User {
    id: number;
    name: string;
    email: string;
    // 其他字段根据你的实际返回加
  }

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("${API_BASE_URL}/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => {
          console.error("❌ 获取用户失败：", err);
          setUser(null);
        });
    }
  }, []);

  return { user };
}
