"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user && token.length > 10) {
      setAuthorized(true);
    } else {
      router.push("/login");
    }

    setChecked(true);
  }, []);

  if (!checked || !authorized) return null;

  return <>{children}</>;
}
