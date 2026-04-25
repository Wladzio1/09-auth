import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "@/lib/api/serverApi";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isPrivate =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  let response = NextResponse.next();

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
      if (isPrivate) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  if (!accessToken && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
