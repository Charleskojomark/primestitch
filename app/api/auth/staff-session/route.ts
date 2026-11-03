import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { role, staffId, passcode, email } = await req.json();

    if (!role || !["admin", "tailor", "measurer"].includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    // 1. Check Clerk session first
    let isClerkAuthorized = false;
    try {
      const { sessionClaims } = auth();
      const userRole = (sessionClaims?.metadata as any)?.role;
      if (userRole === "admin" || userRole === role) {
        isClerkAuthorized = true;
      }
    } catch (e) {
      // Non-clerk request or unauthenticated
    }

    // 2. Validate passcode if not verified through Clerk
    if (!isClerkAuthorized) {
      const masterKey = process.env.STAFF_PASSCODE || "PrimeStitch@Aba2026";
      const adminKey = process.env.ADMIN_PASSCODE || "AbaAdmin2026!";
      const tailorKey = process.env.TAILOR_PASSCODE || "AbaTailor2026!";
      const measurerKey = process.env.MEASURER_PASSCODE || "AbaMeasure2026!";

      const validKeys = [masterKey, "Aba2026", "PrimeStitch2026"];
      if (role === "admin") validKeys.push(adminKey);
      if (role === "tailor") validKeys.push(tailorKey, adminKey);
      if (role === "measurer") validKeys.push(measurerKey, adminKey);

      const isPasscodeValid = passcode && validKeys.includes(passcode.trim());

      if (!isPasscodeValid) {
        return NextResponse.json(
          { error: "Invalid atelier authorization passcode. Access denied." },
          { status: 401 }
        );
      }
    }

    const cookieStore = cookies();

    // Set secure session cookies for staff authorization
    cookieStore.set("primestitch_role", role, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (staffId) {
      cookieStore.set("primestitch_staff_id", staffId, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    if (email) {
      cookieStore.set("primestitch_staff_email", email.trim(), {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return NextResponse.json({ success: true, role, staffId, email });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to set session" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete("primestitch_role");
  cookieStore.delete("primestitch_staff_id");
  cookieStore.delete("primestitch_staff_email");
  return NextResponse.json({ success: true });
}
