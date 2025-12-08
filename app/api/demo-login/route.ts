// app/api/demo-login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CLERK_SIGNIN_TOKENS_URL = "https://api.clerk.com/v1/sign_in_tokens";
const CLERK_SECRET = process.env.CLERK_SECRET_KEY;
const DEMO_USER_ID = process.env.DEMO_USER_ID; // e.g. "user_abc_demo"
const DEMO_SECRET = process.env.DEMO_SECRET;   // a shared secret you embed in demo links
const DEFAULT_EXPIRES = 300; // seconds (5 minutes)

/**
 * Simple in-memory rate limiter keyed by IP.
 * - Keeps a list of timestamps for requests.
 * - Allows up to N requests in WINDOW seconds.
 *
 * NOTE: This memory-based approach is fine for a single process demo app.
 * For production / horizontally scaled servers use Redis or another shared store.
 */
const RATE_LIMIT_WINDOW = 60; // seconds
const RATE_LIMIT_MAX = 10; // max requests per window per IP
const ipRequestLog = new Map<string, number[]>();

function rateLimitOk(ip: string) {
  const now = Date.now() / 1000;
  const list = ipRequestLog.get(ip) ?? [];
  // keep only recent timestamps
  const recent = list.filter((t) => t > now - RATE_LIMIT_WINDOW);
  recent.push(now);
  ipRequestLog.set(ip, recent);
  return recent.length <= RATE_LIMIT_MAX;
}

async function createClerkSignInToken(userId: string, expiresInSeconds = DEFAULT_EXPIRES) {
  if (!CLERK_SECRET) {
    throw new Error("Missing CLERK_SECRET_KEY env var");
  }

  const body = {
    user_id: userId,
    expires_in_seconds: expiresInSeconds,
    // Clerk may accept other fields (e.g. after_authentication_url) depending on your setup.
  };

  const res = await fetch(CLERK_SIGNIN_TOKENS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLERK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Clerk API error (${res.status}): ${text}`);
  }

  return res.json() as Promise<{ url: string }>;
}

export async function GET(req: NextRequest) {
  try {
    // Basic security gate: require the demo secret query param
    const q = Object.fromEntries(req.nextUrl.searchParams.entries());
    const secret = q.secret;
    if (!DEMO_SECRET) {
      return new NextResponse("Demo not configured", { status: 500 });
    }
    if (secret !== DEMO_SECRET) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Rate limit by IP
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";
    if (!rateLimitOk(ip)) {
      return new NextResponse("Too many demo requests, try again later", { status: 429 });
    }

    // You can optionally accept a redirect target param and validate it
    const redirectTo = q.redirect || "/"; // optional final app path post-login

    // Create sign-in token for the demo user
    if (!DEMO_USER_ID) {
      return new NextResponse("Demo user not configured", { status: 500 });
    }

    const tokenPayload = await createClerkSignInToken(DEMO_USER_ID, DEFAULT_EXPIRES);
    const clerkUrl = tokenPayload.url;
    if (!clerkUrl) {
      return new NextResponse("Clerk did not return a sign-in url", { status: 500 });
    }

    // Optionally, if you need the user to land at a certain app path after Clerk,
    // you can include a redirect param in the url returned by Clerk if your Clerk setup supports it.
    // By default Clerk will redirect back to your configured allowed URL/origin.

    // Redirect the client to the Clerk magic link
    return NextResponse.redirect(clerkUrl);
  } catch (err: any) {
    console.error("demo-login error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
