"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { login, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}