// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",          // protect root/dashboard routes
  "/dashboard(.*)",
  "/auth(.*)",  // keep your auth matcher if needed
]);

const DEMO_COOKIE_NAME = "demo_user";
const ENABLE_DEMO = process.env.ENABLE_DEMO === "true";

export default clerkMiddleware((auth, request) => {
  const pathname = request.nextUrl.pathname;

  // Always allow demo-login and the public demo landing
  if (pathname === "/api/demo-login" || pathname === "/demo") {
    return NextResponse.next();
  }

  // If demo is enabled and demo cookie present, skip Clerk protection
  if (ENABLE_DEMO) {
    // RequestCookies API in middleware: request.cookies.get('name')?.value
    const demoCookie = request.cookies.get(DEMO_COOKIE_NAME)?.value;
    if (demoCookie) {
      // you can optionally validate demoCookie === process.env.DEMO_USER_ID
      return NextResponse.next();
    }
  }

  // Default: protect protected routes with Clerk
  if (isProtectedRoute(request)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
