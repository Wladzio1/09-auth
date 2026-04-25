import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  let response = NextResponse.next();

  // refresh session
  if (!accessToken && refreshToken) {
    try {
      const res = await checkSession();

      const setCookie = res.headers["set-cookie"];

      if (setCookie) {
        const cookiesArr = Array.isArray(setCookie) ? setCookie : [setCookie];

        cookiesArr.forEach((cookie) => {
          response.headers.append("set-cookie", cookie);
        });
      }
    } catch {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  // no access
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // logged in users on auth pages
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
