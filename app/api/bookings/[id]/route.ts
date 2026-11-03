import { NextRequest, NextResponse } from "next/server";
import { updateBooking } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const id = decodeURIComponent(params.id);
    const updated = await updateBooking(id, body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update booking" }, { status: 500 });
  }
}

