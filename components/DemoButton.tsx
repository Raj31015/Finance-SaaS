// components/DemoButton.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  redirectTo?: string;
};

export default function DemoButton({ className, redirectTo = "/dashboard" }: Props) {
  const router = useRouter();

  const startDemo = async () => {
    try {
      const res = await fetch("/api/demo-login", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert("Demo login failed: " + (data?.error || res.statusText));
        return;
      }
      // Cookie is set by server; redirect to demo landing
      router.push(redirectTo);
    } catch (err) {
      console.error("Demo login error", err);
      alert("Demo login error");
    }
  };

  return (
    <button onClick={startDemo} className={className}>
      Try demo — no login
    </button>
  );
}
