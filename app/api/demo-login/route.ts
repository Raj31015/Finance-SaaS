import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const demoUserId = process.env.DEMO_USER_ID!;
  const signInTokenResp = await clerkClient.signInTokens.createSignInToken({
    userId: demoUserId,
    expiresInSeconds:600
  })

const token=signInTokenResp.token

const url="https://relaxing-fish-40.accounts.dev/sign-in/token#token=${token}"
  return NextResponse.redirect(url);
}
