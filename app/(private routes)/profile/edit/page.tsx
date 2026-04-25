"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username || "");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await updateMe({ username });

    setUser(res);
    router.push("/profile");
  }

  return (
    <main>
      <h1>Edit Profile</h1>

      <Image src={user?.avatar || ""} alt="avatar" width={120} height={120} />

      <form onSubmit={onSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />

        <p>{user?.email}</p>

        <button type="submit">Save</button>

        <button type="button" onClick={() => router.push("/profile")}>
          Cancel
        </button>
      </form>
    </main>
  );
}
