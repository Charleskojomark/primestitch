import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PrimeStitch — Your outfit, ready on the day you need it";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1528",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Top Gold Measuring Tape Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "#FFC72C",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand Mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                background: "#C28B28",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0B1528",
                fontWeight: 900,
                fontSize: "28px",
              }}
            >
              ✂
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              PRIMESTITCH
            </div>
          </div>

          {/* Location Badge */}
          <div
            style={{
              background: "#16233B",
              border: "1.5px solid #C28B28",
              color: "#FFC72C",
              padding: "10px 24px",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            ABA MASTER ATELIER • NATIONWIDE DELIVERY
          </div>
        </div>

        {/* Center Tagline & Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Your outfit, ready on the day you need it.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#CBD5E1",
              lineHeight: 1.45,
            }}
          >
            Precision made-to-measure Nigerian native wear and bespoke tailoring.
            Every garment locked with a firm delivery guarantee and 9-stage live artisan tracking.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            borderTop: "1px solid rgba(203, 213, 225, 0.2)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#FFC72C",
              fontSize: "17px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            <span>⚡</span> LOCKED DELIVERY DATE SLA
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#CBD5E1",
              fontSize: "17px",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#C28B28" }}>•</span> 9-STAGE LIVE PROGRESS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#CBD5E1",
              fontSize: "17px",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#0A5C36" }}>•</span> DOORSTEP & VIDEO FITTINGS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

