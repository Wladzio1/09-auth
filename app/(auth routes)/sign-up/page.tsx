"use client";

import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      await register({ email, password });
      router.push("/profile");
    } catch {
      setError("Error");
    }
  };

  return (
    <main>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" required />
        <input name="password" type="password" required />
        <button type="submit">Register</button>
        <p>{error}</p>
      </form>
    </main>
  );
}
