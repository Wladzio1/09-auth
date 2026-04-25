import { getMe } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile page",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <div>
      <Image
        src={user.avatar || ""}
        alt={user.username}
        width={120}
        height={120}
      />

      <h1>{user.username}</h1>
      <p>{user.email}</p>

      <Link href="/profile/edit">Edit profile</Link>
    </div>
  );
}
