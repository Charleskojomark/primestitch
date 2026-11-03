import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isTailorRoute = createRouteMatcher(["/tailor(.*)"]);
const isMeasurerRoute = createRouteMatcher(["/measurer(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();
  const cookies = req.cookies;
  const staffRole = cookies.get("primestitch_role")?.value;

  // 1. ADMIN ROUTES RBAC
  if (isAdminRoute(req)) {
    const isClerkAdmin = (sessionClaims?.metadata as any)?.role === "admin";
    const isStaffAdmin = staffRole === "admin";

    if (!isClerkAdmin && !isStaffAdmin) {
      const loginUrl = new URL("/staff/login", req.url);
      loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
      loginUrl.searchParams.set("role", "admin");
      loginUrl.searchParams.set("error", "admin_required");
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. TAILOR ROUTES RBAC
  if (isTailorRoute(req)) {
    const isClerkTailor =
      (sessionClaims?.metadata as any)?.role === "tailor" ||
      (sessionClaims?.metadata as any)?.role === "admin";
    const isStaffTailor = staffRole === "tailor" || staffRole === "admin";

    if (!isClerkTailor && !isStaffTailor) {
      const loginUrl = new URL("/staff/login", req.url);
      loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
      loginUrl.searchParams.set("role", "tailor");
      loginUrl.searchParams.set("error", "tailor_required");
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. MEASURER ROUTES RBAC
  if (isMeasurerRoute(req)) {
    const isClerkMeasurer =
      (sessionClaims?.metadata as any)?.role === "measurer" ||
      (sessionClaims?.metadata as any)?.role === "admin";
    const isStaffMeasurer = staffRole === "measurer" || staffRole === "admin";

    if (!isClerkMeasurer && !isStaffMeasurer) {
      const loginUrl = new URL("/staff/login", req.url);
      loginUrl.searchParams.set("redirect", req.nextUrl.pathname);
      loginUrl.searchParams.set("role", "measurer");
      loginUrl.searchParams.set("error", "measurer_required");
      return NextResponse.redirect(loginUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
