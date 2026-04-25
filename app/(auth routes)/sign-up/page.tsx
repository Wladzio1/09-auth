"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    try {
      const user = await register({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });

      setUser(user); // ❗ tylko to
      router.push("/profile");
    } catch {
      setError("Error");
    }
  }

  return (
    <main>
      <h1>Sign up</h1>

      <form onSubmit={onSubmit}>
        <input name="email" type="email" required />
        <input name="password" type="password" required />

        <button type="submit">Register</button>

        <p>{error}</p>
      </form>
    </main>
  );
}
