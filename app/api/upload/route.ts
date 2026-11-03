import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const folder = (formData.get("folder") as string) || "primestitch/garments";
    const resourceType = (formData.get("resource_type") as string) || "auto"; // "image" | "video" | "auto"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "sq0fcvzp";
    const apiKey = process.env.CLOUDINARY_API_KEY || "693546314946947";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "qQBc0Z4oVGbImAS7kOUYZf_-nw0";

    const timestamp = Math.round(Date.now() / 1000);

    // Cloudinary signature parameters must be sorted alphabetically
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex");

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("api_key", apiKey);
    uploadFormData.append("timestamp", timestamp.toString());
    uploadFormData.append("signature", signature);
    uploadFormData.append("folder", folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: uploadFormData,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Cloudinary upload failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      resourceType: data.resource_type,
      width: data.width,
      height: data.height,
      duration: data.duration, // Available for video
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process media upload" },
      { status: 500 }
    );
  }
}

