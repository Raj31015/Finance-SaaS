import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher([
  '/',
  '/auth(.*)'
  
]);
export default clerkMiddleware((auth,request)=>{
    const pathname = request.nextUrl.pathname;
  if (pathname === '/api/demo-login' || pathname === '/demo') {
    return NextResponse.next();
  }

  if(isProtectedRoute(request)){
    auth().protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
