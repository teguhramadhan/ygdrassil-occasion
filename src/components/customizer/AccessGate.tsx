"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Invitation } from "@/lib/invitation";
import CustomizerApp from "./CustomizerApp";

export default function AccessGate({ invitation }: { invitation: Invitation }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAuth = sessionStorage.getItem("ygdrassil:auth") === "true";
    if (!isAuth) {
      router.push("/login");
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ea] text-[#1b1a17]">
        <p className="text-sm opacity-60">Memuat editor studio...</p>
      </div>
    );
  }

  return <CustomizerApp invitation={invitation} />;
}
