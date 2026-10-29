import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PrimeStitchProvider } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://primestitch-beta.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0B1528",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PrimeStitch | Precision Nigerian Bespoke Atelier",
    template: "%s | PrimeStitch",
  },
  description:
    "Your outfit, ready on the day you need it. Precision made-to-measure Nigerian native wear and tailoring from Aba with locked delivery guarantees and 9-stage live tracking.",
  applicationName: "PrimeStitch",
  keywords: [
    "Nigerian bespoke tailoring",
    "Aba tailor",
    "made-to-measure kaftan",
    "senator wear",
    "Nigerian native wear",
    "online tailor Nigeria",
    "guaranteed delivery date tailoring",
    "Aso Ebi bulk tailoring",
  ],
  authors: [{ name: "PrimeStitch Master Atelier" }],
  creator: "PrimeStitch",
  publisher: "PrimeStitch",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "PrimeStitch | Precision Nigerian Bespoke Atelier",
    description: "Your outfit, ready on the day you need it. Order bespoke native wear online with locked delivery dates and 9-stage live progress tracking.",
    url: "/",
    siteName: "PrimeStitch",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeStitch | Precision Nigerian Bespoke Atelier",
    description: "Your outfit, ready on the day you need it. Order bespoke native wear online with locked delivery dates and 9-stage live progress tracking.",
    creator: "@primestitch",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/brand/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col bg-surface text-on-surface antialiased selection:bg-accent-tape selection:text-primary w-full max-w-full overflow-x-hidden">
        <PrimeStitchProvider>
          <Header />
          <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <WhatsAppButton variant="floating" />
        </PrimeStitchProvider>
      </body>
    </html>
  );
}
