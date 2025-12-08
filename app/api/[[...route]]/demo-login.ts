// pages/api/demo-login.ts
import type { NextApiRequest, NextApiResponse } from "next";

const DEMO_USER_ID = process.env.DEMO_USER_ID || "demo-user-1";
const DEMO_COOKIE_NAME = "demo_user";
const DEMO_TTL_SECONDS = 60 * 10; // 10 minutes
const ENABLE_DEMO = process.env.ENABLE_DEMO === "true";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!ENABLE_DEMO) {
    return res.status(403).json({ error: "Demo not enabled" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const cookie = [
    `${DEMO_COOKIE_NAME}=${encodeURIComponent(DEMO_USER_ID)}`,
    `Max-Age=${DEMO_TTL_SECONDS}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ ok: true, expiresIn: DEMO_TTL_SECONDS });
}
