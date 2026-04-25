import { getMe } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const user = (await getMe()).data;

  return (
    <div>
      <Image src={user.avatar} alt="avatar" width={120} height={120} />

      <h1>{user.username}</h1>
      <p>{user.email}</p>

      <Link href="/profile/edit">Edit</Link>
    </div>
  );
}
