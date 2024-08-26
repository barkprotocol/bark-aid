"use client";

import { createSolanaQR, encodeURL } from "@solana/actions";
import { useEffect, useRef } from "react";

type ComponentProps = {
  url: string | URL;
  className?: string;
  background?: string;
  color?: string;
  size?: number;
};

export function SolanaQRCode({
  url,
  className,
  background = "transparent",
  color = "#080808", // Default color if not provided
  size = 400,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Ensure the URL is valid
      const resolvedUrl = new URL(url, window.location.href);
      const encodedUrl = encodeURL(
        {
          link: resolvedUrl,
        },
        "solana:"
      );

      console.log("encodedUrl:", encodedUrl.toString());

      // Create the QR code
      const qr = createSolanaQR(encodedUrl, size, background, color);

      // Append the QR code to the ref element if it's not already populated
      if (ref.current) {
        ref.current.innerHTML = ''; // Clear previous content
        qr.append(ref.current);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, [url, background, color, size]); // Added dependencies to ensure effect is accurate

  return <div ref={ref} className={className} />;
}
