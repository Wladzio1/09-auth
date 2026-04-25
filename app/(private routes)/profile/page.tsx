import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getMe } from "@/lib/api/serverApi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile page",
};

export default async function ProfilePage() {
  const cookieStore = cookies();
  const user = await getMe(cookieStore.toString());

  return (
    <main>
      <h1>Profile Page</h1>

      <Image src={user.avatar} alt="avatar" width={120} height={120} />

      <p>{user.username}</p>
      <p>{user.email}</p>

      <Link href="/profile/edit">Edit Profile</Link>
    </main>
  );
}
