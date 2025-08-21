import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = false; //dummy variable that always false
  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

//only run middleware function on routes match below
export const config = {
  matcher: "/dashboard/:path*",
};
