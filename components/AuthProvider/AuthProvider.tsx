"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [setUser, clearAuth]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
