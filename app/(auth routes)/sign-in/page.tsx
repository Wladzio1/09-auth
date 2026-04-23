"use client";

import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const user = await login({ email, password });
      setUser(user);
      router.push("/profile");
    } catch {
      setError("Error");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <input name="email" required />
        <input name="password" type="password" required />

        <button type="submit">Login</button>
        <p>{error}</p>
      </form>
    </main>
  );
}
