import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus, assignTailor } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = await getOrderById(decodeURIComponent(params.id));
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch order" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const id = decodeURIComponent(params.id);

    if (body.status) {
      const updated = await updateOrderStatus(id, body.status, body.notes);
      return NextResponse.json(updated);
    }

    if (body.assignedTailorId && body.assignedTailorName) {
      const updated = await assignTailor(id, body.assignedTailorId, body.assignedTailorName);
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: "No recognized updates provided" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update order" }, { status: 500 });
  }
}

