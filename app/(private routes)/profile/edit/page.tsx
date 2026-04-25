"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username ?? "");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updated = await updateMe({ username });

    setUser(updated);
    router.push("/profile");
  };

  return (
    <form onSubmit={onSubmit}>
      <Image
        src={user?.avatar ?? ""}
        alt="avatar"
        width={100}
        height={100}
      />

      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input type="email" value={user?.email ?? ""} readOnly />

      <button type="submit">Save</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}
