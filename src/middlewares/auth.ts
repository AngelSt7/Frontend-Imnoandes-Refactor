import { NextRequest, NextResponse } from "next/server";
import { User } from "../features/property/admin/services";

const PUBLIC_AUTH = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
]);

const TEMP_ONLY = new Set(["/auth/complete-profile"]);

const ALLOW_WHEN_AUTHED = new Set(["/auth/logout"]);

export async function withAuth(req: NextRequest): Promise<NextResponse | null> {
  const url = req.nextUrl;
  const pathname = url.pathname;

  if (!url.pathname.startsWith("/dashboard")) {
    return null;
  }

  const token = req.cookies.get("SESSION")?.value ?? null;

  if (!token) {
    if (pathname.startsWith("/auth") && PUBLIC_AUTH.has(pathname)) return null;

    const to = new URL("/auth/login", req.url);
    to.search = "";
    return NextResponse.redirect(to);
  }

  let user;
  try {
    user = await User.validate(token);
    if (!user) throw new Error("invalid token");
  } catch {
    const to = new URL("/auth/login", req.url);
    to.search = "";
    return NextResponse.redirect(to);
  }

  const now = Math.floor(Date.now() / 1000);
  const isTemp = user.exp - now < 6 * 60;

  if (isTemp && !TEMP_ONLY.has(pathname)) {
    const to = new URL("/auth/complete-profile", req.url);
    to.search = "";
    return NextResponse.redirect(to);
  }

  if (!isTemp && pathname.startsWith("/auth") && !ALLOW_WHEN_AUTHED.has(pathname)) {
    const to = new URL("/dashboard/properties?page=1&limit=10", req.url);
    to.search = "";
    return NextResponse.redirect(to);
  }

  return null;
}
