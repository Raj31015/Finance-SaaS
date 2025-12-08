import { redirect } from "next/navigation";
import type { NextApiRequest, NextApiResponse } from "next";
export default function DemoPage(req: NextApiRequest, res: NextApiResponse) {
  const demoEmail = "demouser@example.com";

  const signInUrl = new URL("https://relaxing-fish-40.accounts.dev/sign-in");

  // Clerk prefill
  signInUrl.searchParams.set("prefill_email", demoEmail);

  // Optional: after login redirect back to dashboard
  signInUrl.searchParams.set("redirect_url", "/");

  res.writeHead(302, { Location: signInUrl.toString() });
  res.end();
}
