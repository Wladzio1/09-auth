"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  async function handleLogout() {
    try {
      await logout();
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
      });

      router.push("/sign-in");
    } catch {
      // fallback logout
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
      });

      router.push("/sign-in");
    }
  }

  return (
    <>
      {!isAuthenticated && (
        <>
          <li>
            <Link href="/sign-in">Login</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        </>
      )}

      {isAuthenticated && (
        <>
          <li>
            <Link href="/profile">Profile</Link>
          </li>

          <li>{user?.email}</li>

          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      )}
    </>
  );
}
