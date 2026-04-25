import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const isPrivatePage =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  if (!accessToken && refreshToken) {
    try {
      const res = await checkSession();

      const newAccessToken = res.headers["set-cookie"];

      const response = NextResponse.next();

      if (newAccessToken) {
        response.headers.set("set-cookie", newAccessToken as any);
      }

      return response;
    } catch (e) {
      if (isPrivatePage) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  if (!accessToken && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
