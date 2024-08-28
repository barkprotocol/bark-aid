"use client";

import { createSolanaQR, encodeURL } from "@solana/actions";
import { useEffect, useRef, useCallback } from "react";

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
  size = 400, // Default size if not provided
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Helper function to validate and resolve the URL
  const resolveURL = useCallback((url: string | URL): URL => {
    try {
      return new URL(url, window.location.href);
    } catch {
      console.error("Invalid URL provided:", url);
      throw new Error("Invalid URL provided.");
    }
  }, []);

  useEffect(() => {
    try {
      // Resolve and encode the URL
      const resolvedUrl = resolveURL(url);
      const encodedUrl = encodeURL({ link: resolvedUrl }, "solana:");

      console.log("Encoded URL:", encodedUrl.toString());

      // Create the QR code
      const qr = createSolanaQR(encodedUrl, size, background, color);

      // Append the QR code to the ref element
      if (ref.current) {
        ref.current.innerHTML = ''; // Clear previous content
        // Directly append the QR code element to the ref
        ref.current.appendChild(qr);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, [url, background, color, size, resolveURL]);

  // Ensure size is a positive number
  const validSize = Math.max(size, 100);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: validSize, height: validSize }}
    />
  );
}
