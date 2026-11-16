import { NextResponse, type NextRequest } from "next/server";
import { getInvitationBySlug } from "@/lib/invitations";

const reservedPaths = new Set(["/", "/studio", "/login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (reservedPaths.has(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length !== 1) {
    return NextResponse.next();
  }

  if (getInvitationBySlug(segments[0])) {
    return NextResponse.next();
  }

  return new NextResponse("Undangan tidak ditemukan.", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
