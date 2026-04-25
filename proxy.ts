import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivate =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  if (!accessToken && refreshToken) {
    const res = await checkSession(request.cookies.toString());

    const response = NextResponse.next();

    const setCookie = (res as any).headers?.get?.("set-cookie");

    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  }

  if (!accessToken && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
