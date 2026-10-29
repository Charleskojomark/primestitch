import type { Metadata } from "next";
import "./globals.css";
import { PrimeStitchProvider } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "PrimeStitch | Precision Custom Clothing with Guaranteed Delivery",
  description:
    "Order bespoke made-to-measure Nigerian outfits online. Every order backed by a locked delivery date and 9-stage live tailor tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col bg-surface text-on-surface antialiased selection:bg-accent-tape selection:text-primary">
        <PrimeStitchProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <WhatsAppButton variant="floating" />
        </PrimeStitchProvider>
      </body>
    </html>
  );
}

