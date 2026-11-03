import { NextRequest, NextResponse } from "next/server";
import { getDesigns, createDesign, createBatchDesigns } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const designs = await getDesigns();
    return NextResponse.json(designs);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch designs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (Array.isArray(body)) {
      const results = await createBatchDesigns(body);
      return NextResponse.json({ success: true, count: results.length, designs: results }, { status: 201 });
    }

    const design = await createDesign(body);
    return NextResponse.json(design, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to save design to database" },
      { status: 500 }
    );
  }
}
