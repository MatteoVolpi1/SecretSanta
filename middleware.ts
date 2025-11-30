import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next.js internals, assets, API, and landing
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/landing")
  ) {
    return NextResponse.next();
  }

  const lang = req.cookies.get("lang")?.value;
  if (!lang) {
    // If no language set, send users to landing
    const url = req.nextUrl.clone();
    url.pathname = "/landing";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
