"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolanaQRCode } from "@/components/qr-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

export default function TransferSOLPage() {
  // Define the API path for transferring SOL
  const apiPath = "/api/actions/transfer-sol";
  const [apiEndpoint, setApiEndpoint] = useState<string | null>(null);

  // Effect to set the API endpoint URL
  useEffect(() => {
    try {
      const endpoint = new URL(apiPath, window.location.origin).toString();
      setApiEndpoint(endpoint);
    } catch (err) {
      console.error("Error constructing API URL:", err);
      setApiEndpoint(null);
    }
  }, []);

  return (
    <section
      id="transfer-sol"
      className="container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-tight sm:text-3xl md:text-6xl">
          Transfer SOL
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          This example demonstrates how to transfer native SOL to another wallet using an Action.
        </p>
      </div>

      {apiEndpoint ? (
        <>
          <Card className="group-hover:border-primary rounded overflow-hidden text-center flex items-center justify-center mx-auto max-w-[400px]">
            <SolanaQRCode
              url={apiEndpoint}
              color="white"
              background="black"
              size={400}
              className="rounded-lg w-full"
              aria-label="QR code for SOL transfer endpoint"
            />
          </Card>

          <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              View the{" "}
              <Button variant="link" asChild>
                <Link
                  href={`${siteConfig.links.github}/src/app${apiPath}/route.ts`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source code for this transfer Action
                </Link>
              </Button>{" "}
              on GitHub.
            </p>
          </div>

          <Card className="group-hover:border-primary">
            <CardHeader>
              <CardTitle className="space-y-3">Action Endpoint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                <Link
                  href={apiEndpoint}
                  target="_blank"
                  className="underline hover:text-primary"
                  rel="noopener noreferrer"
                  aria-label="API endpoint URL"
                >
                  {apiEndpoint}
                </Link>
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <p className="text-center text-red-500">Failed to load API endpoint. Please try again later.</p>
      )}
    </section>
  );
}
