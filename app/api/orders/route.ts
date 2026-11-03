import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = await createOrder(body);
    return NextResponse.json(order, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}

