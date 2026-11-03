import { NextRequest, NextResponse } from "next/server";
import { getBookings, createBooking } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const booking = await createBooking(body);
    return NextResponse.json(booking, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create booking" }, { status: 500 });
  }
}

