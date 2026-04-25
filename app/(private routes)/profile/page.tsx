import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";

export const metadata = {
  title: "Profile",
  description: "User profile",
};

export default async function ProfilePage() {
  const res = await getMe();
  const user = res.data;

  return (
    <main>
      <h1>Profile</h1>

      <Image src={user.avatar} alt="avatar" width={120} height={120} />

      <p>{user.username}</p>
      <p>{user.email}</p>

      <Link href="/profile/edit">Edit Profile</Link>
    </main>
  );
}
