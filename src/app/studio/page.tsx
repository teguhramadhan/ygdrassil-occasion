"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { getAllInvitations } from "@/lib/invitations";
import { getThemeMeta } from "@/lib/themes";
import {
  DashboardIcon,
  GlobeIcon,
  LogOutIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
  MenuIcon,
} from "@/components/shared/Icons";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

export default function StudioDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState("user");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const invitations = getAllInvitations();

  useEffect(() => {
    setMounted(true);
    const isAuth = sessionStorage.getItem("ygdrassil:auth") === "true";
    const email = sessionStorage.getItem("ygdrassil:user") || "user";

    if (!isAuth) {
      router.push("/login");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ea] text-[#1b1a17]">
        <p className="text-sm opacity-60">Memuat dashboard studio...</p>
      </div>
    );
  }

  function handleLogout() {
    sessionStorage.removeItem("ygdrassil:auth");
    sessionStorage.removeItem("ygdrassil:user");
    router.push("/");
  }

  return (
    <div
      className={`${fraunces.variable} flex min-h-screen bg-[#f7f3ec] font-sans text-[#1b1a17]`}
    >
      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#1b1a17]/10 bg-white p-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-[#1b1a17]/10 pb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b1a17] text-sm font-semibold text-[#f7f3ec]">
            Y
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight">
              Ygdrassil Studio
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
              Creator Dashboard
            </p>
          </div>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          <Link
            href="/studio"
            className="flex items-center gap-3 rounded-2xl bg-[#1b1a17] px-4 py-3 text-xs font-semibold text-[#f7f3ec]"
          >
            <DashboardIcon className="text-[#f7f3ec]" />
            <span>Dashboard Undangan</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-medium text-[#5f5a50] transition hover:bg-[#f7f3ec]"
          >
            <GlobeIcon className="text-[#8a8375]" />
            <span>Website Utama</span>
            <ExternalLinkIcon className="ml-auto opacity-60" />
          </Link>
        </nav>

        <div className="border-t border-[#1b1a17]/10 pt-4">
          <div className="flex items-center justify-between rounded-2xl bg-[#f7f3ec] p-4">
            <div className="truncate">
              <p className="text-xs font-semibold">Akun Aktif</p>
              <p className="truncate text-[11px] text-[#8a8375]">{userEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Keluar"
              className="rounded-xl bg-white p-2 text-xs shadow-sm transition hover:bg-[#1b1a17] hover:text-white"
            >
              <LogOutIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#1b1a17]/10 bg-white/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl border border-[#1b1a17]/15 p-2 text-sm lg:hidden"
            >
              <MenuIcon />
            </button>
            <div>
              <h1
                className="text-xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Dashboard Undangan
              </h1>
              <p className="text-xs text-[#8a8375]">
                Selamat datang kembali, {userEmail}!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold">{userEmail}</p>
              <p className="text-[10px] text-[#8a8375]">Creator tier</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-[#1b1a17]/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1b1a17] transition hover:bg-[#1b1a17] hover:text-[#f7f3ec]"
            >
              <LogOutIcon />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Stats Overview */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#1b1a17]/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
                Total Undangan
              </p>
              <p className="mt-2 text-3xl font-semibold">{invitations.length}</p>
              <p className="mt-1 text-xs text-[#5f5a50]">Template siap kustomisasi</p>
            </div>
            <div className="rounded-3xl border border-[#1b1a17]/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
                Status Server
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#3f6b3f]">Online</p>
              <p className="mt-1 text-xs text-[#5f5a50]">Studio lokal siap digunakan</p>
            </div>
            <div className="rounded-3xl border border-[#1b1a17]/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
                Mode Editor
              </p>
              <p className="mt-2 text-3xl font-semibold">Drag & Drop</p>
              <p className="mt-1 text-xs text-[#5f5a50]">14 section fleksibel</p>
            </div>
          </div>

          {/* Invitation List Section */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Daftar Undangan Anda
                </h2>
                <p className="text-xs text-[#8a8375]">
                  Pilih undangan untuk masuk ke studio editor drag-and-drop.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {invitations.map((invitation) => {
                const theme = getThemeMeta(invitation.themeId);

                return (
                  <div
                    key={invitation.slug}
                    className="group flex flex-col justify-between rounded-3xl border border-[#1b1a17]/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full bg-[#f7f3ec] px-3 py-1 font-mono text-[10px] text-[#8a8375]">
                          /{invitation.slug}
                        </span>
                        <span className="rounded-full bg-[#e4efe4] px-2.5 py-1 text-[10px] font-medium text-[#3f6b3f]">
                          Aktif
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold tracking-tight">
                        {invitation.couple.bride.nickname} &{" "}
                        {invitation.couple.groom.nickname}
                      </h3>
                      <p className="mt-1 text-xs text-[#8a8375]">
                        Tema: <span className="font-medium text-[#1b1a17]">{theme?.name ?? invitation.themeId}</span>
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 pt-4 border-t border-[#1b1a17]/10">
                      <Link
                        href={`/studio/${invitation.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#1b1a17] py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#f7f3ec] transition hover:opacity-85"
                      >
                        <span>Buka Studio</span>
                        <ArrowRightIcon className="text-[#f7f3ec]" />
                      </Link>
                      <Link
                        href={`/${invitation.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-full border border-[#1b1a17]/20 p-3 text-xs font-semibold text-[#1b1a17] transition hover:bg-[#f7f3ec]"
                        title="Preview Publik"
                      >
                        <ExternalLinkIcon />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
