import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Redirects directly to Clerk sign-in with a prefilled demo email.
 * This uses Clerk's `prefill_email` parameter, which Clerk officially supports.
 * No backend session creation is required or allowed.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const demoEmail = "demouser@example.com";

  const signInUrl = new URL("https://relaxing-fish-40.accounts.dev/sign-in");

  // Clerk prefill
  signInUrl.searchParams.set("prefill_email", demoEmail);

  // Optional: after login redirect back to dashboard
  signInUrl.searchParams.set("redirect_url", "/");

  res.writeHead(302, { Location: signInUrl.toString() });
  res.end();
}
