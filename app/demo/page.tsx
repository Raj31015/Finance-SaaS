import { redirect } from "next/navigation";

export default function DemoPage() {
  const demoEmail = "demouser@example.com";

  const signInUrl = new URL("https://relaxing-fish-40.accounts.dev/sign-in");

  // Clerk prefill
  signInUrl.searchParams.set("email_address", demoEmail);

  // Optional: after login redirect back to dashboard
  signInUrl.searchParams.set("redirect_url", "/");

    redirect(signInUrl.toString());
}
