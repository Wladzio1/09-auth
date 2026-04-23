"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearAuth();
    router.push("/sign-in");
  };

  if (isAuthenticated) {
    return (
      <>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <p>{user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <a href="/sign-in">Login</a>
      </li>
      <li>
        <a href="/sign-up">Sign up</a>
      </li>
    </>
  );
}
