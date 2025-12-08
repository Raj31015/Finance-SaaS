// lib/auth.ts
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

const DEMO_COOKIE_NAME = "demo_user";
const ENABLE_DEMO = process.env.ENABLE_DEMO === "true";

export function getUserIdFromRequest(req: NextRequest | { headers?: Record<string,string> }) {
  // 1) try Clerk (server helper)
  try {
    // getAuth works with NextRequest in app-router handlers or Node request in pages-api if you pass req as any
    const clerk = getAuth(req as any);
    if (clerk?.userId) return { userId: clerk.userId, demo: false, provider: "clerk" as const };
  } catch (e) {
    // ignore and fallback
  }

  // 2) fallback to demo cookie (only if enabled)
  if (ENABLE_DEMO) {
    const cookieHeader = (req as any).headers?.get ? (req as any).headers.get("cookie") : (req as any).headers?.cookie || "";
    const cookies = (cookieHeader || "").split(";").map((c:string) => c.trim());
    const match = cookies.find((c:string) => c.startsWith(`${DEMO_COOKIE_NAME}=`));
    if (match) {
      const val = decodeURIComponent(match.split("=")[1] || "");
      if (val) return { userId: val, demo: true, provider: "demo" as const };
    }
  }

  return { userId: null, demo: false, provider: null as null };
}
