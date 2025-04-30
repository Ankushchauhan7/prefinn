// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Define protected routes
// const protectedRoutes = ["/dashboard"];

// export function middleware(request: NextRequest) {
//   const isLoggedIn = request.cookies.get("loggedIn")?.value;

//   const { pathname } = request.nextUrl;

//   // If trying to access a protected route without being logged in
//   if (protectedRoutes.includes(pathname) && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // If logged in and trying to access login page, redirect to dashboard
//   if (pathname === "/login" && isLoggedIn) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// // Run middleware only on these routes
// export const config = {
//   matcher: ["/dashboard", "/login"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
