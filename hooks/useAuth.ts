// hooks/useAuth.ts
import { useEffect, useState } from "react";


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
      fetch("http://localhost:8000/me", {
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
