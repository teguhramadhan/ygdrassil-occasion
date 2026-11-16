"use client";

type ToastProps = {
  message: string | null;
  tone?: "info" | "error";
};

export default function Toast({ message, tone = "info" }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-xs font-medium shadow-lg ${
        tone === "error"
          ? "bg-[#a33a3a] text-white"
          : "bg-[#1b1a17] text-[#f7f3ec]"
      }`}
    >
      {message}
    </div>
  );
}
