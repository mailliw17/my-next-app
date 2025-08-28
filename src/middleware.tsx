import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// this middleware.tsx file is for route protection
export default withAuth(
  // add the custome logic here
  function middleware(req) {
    //get pathname from the request URL
    const path = req.nextUrl.pathname;
    const userRole = req.nextauth?.token?.role;

    if (path.startsWith("/dashboard/") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, //only allow authenticated user
    },
  }
);

//Apply this middleware to all protected routes
export const config = {
  matcher: "/dashboard/:path*",
};
