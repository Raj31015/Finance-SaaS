import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const DEMO_USER_ID = process.env.DEMO_USER_ID || "demo-user-1";

  const res = NextResponse.redirect(new URL("/", req.url));

  res.cookies.set({
    name: "demo_user",
    value: DEMO_USER_ID,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  return res;
}
