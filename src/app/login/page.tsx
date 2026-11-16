"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("user");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (username.trim() !== "user" || password !== "user") {
      setError("Login gagal! Gunakan username/email 'user' dan password 'user'.");
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("ygdrassil:auth", "true");
      sessionStorage.setItem("ygdrassil:user", username);
    }

    router.push("/studio");
  }

  return (
    <div
      className={`${fraunces.variable} flex min-h-screen items-center justify-center bg-[#f7f3ec] px-6 font-sans text-[#1b1a17]`}
    >
      <div className="w-full max-w-md rounded-3xl border border-[#1b1a17]/10 bg-white p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1b1a17] text-sm font-semibold text-[#f7f3ec]">
            Y
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight">
              Ygdrassil Occasion
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
              Creator Studio Login
            </p>
          </div>
        </div>

        <h1
          className="mt-6 text-3xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Masuk ke Studio
        </h1>
        <p className="mt-2 text-sm text-[#5f5a50]">
          Masukkan akun demo Anda untuk mengelola undangan digital.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
              Username / Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#1b1a17]/15 px-4 py-3 text-sm text-[#1b1a17] outline-none focus:border-[#1b1a17]"
              placeholder="Contoh: user"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#1b1a17]/15 px-4 py-3 text-sm text-[#1b1a17] outline-none focus:border-[#1b1a17]"
              placeholder="Contoh: user"
              required
            />
          </div>

          <p className="text-[11px] text-[#8a8375]">
            💡 Tips Demo: Username <code className="rounded bg-[#f7f3ec] px-1 py-0.5 font-mono text-[#1b1a17]">user</code> & Password <code className="rounded bg-[#f7f3ec] px-1 py-0.5 font-mono text-[#1b1a17]">user</code>
          </p>

          {error && (
            <p className="text-xs text-[#a33a3a]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#1b1a17] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f7f3ec] transition hover:opacity-85"
          >
            Masuk ke Studio
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-[#8a8375] transition hover:text-[#1b1a17]"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
