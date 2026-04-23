"use client";

import { useAuthStore } from "@/lib/store/authStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <main>
      <h1>Profile Page</h1>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
    </main>
  );
}
