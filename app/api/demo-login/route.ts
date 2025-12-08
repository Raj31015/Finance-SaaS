// app/api/demo-login/route.ts

import { NextResponse } from "next/server";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function GET(req: Request) {
  const demoUserId = process.env.DEMO_USER_ID;

  if (!demoUserId) {
    return NextResponse.json({ error: "Missing demo user ID" }, { status: 500 });
  }

  // Create Clerk session for demo user
  const session = await clerk.sessions.createSession({
    userId: demoUserId,
  });

  // Create a Set-Cookie header for __session
  const res = NextResponse.redirect(new URL("/", req.url)); // your landing/dashboard route

  res.cookies.set("__session", session.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
