import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PrimeStitch — Nigerian Bespoke Atelier",
    short_name: "PrimeStitch",
    description: "Precision custom-clothing platform for Nigerian made-to-measure tailoring with deadline tracking.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1528",
    theme_color: "#0B1528",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

