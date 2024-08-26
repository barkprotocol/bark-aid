import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

export function DevnetAlert() {
  return (
    <Alert variant="caution">
      <TriangleAlertIcon className="h-5 w-5 text-caution" />
      <AlertTitle>Devnet ONLY</AlertTitle>
      <AlertDescription>
        This example action is configured to run on Solana&apos;s devnet. Make
        sure your wallet is set to devnet when testing this transaction.
      </AlertDescription>
    </Alert>
  );
}
