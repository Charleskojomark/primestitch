import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { role, staffId } = await req.json();

    if (!role || !["admin", "tailor", "measurer"].includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    const cookieStore = cookies();

    // Set secure session cookies for RBAC
    cookieStore.set("primestitch_role", role, {
      path: "/",
      httpOnly: false, // Accessible to client & middleware
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

    return NextResponse.json({ success: true, role, staffId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to set session" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete("primestitch_role");
  cookieStore.delete("primestitch_staff_id");
  return NextResponse.json({ success: true });
}

