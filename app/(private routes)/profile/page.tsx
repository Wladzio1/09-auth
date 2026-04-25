"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main>
      <h1>Profile Page</h1>

      {user && (
        <>
          <Image src={user.avatar} alt="avatar" width={120} height={120} />

          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      )}

      <Link href="/profile/edit">Edit Profile</Link>
    </main>
  );
}
