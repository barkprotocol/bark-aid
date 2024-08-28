import { NextApiRequest, NextApiResponse } from "next";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { handleDonation } from "./donateHandler";
import { DONATE_API_PATH, DONATION_MESSAGE } from "./const";
import { validateDonationRequest } from "./validate";
import { DonationRequest, DonationResponse } from "./types";

// Helper function to get the Solana connection
function getConnection(): Connection {
  const rpcUrl = process.env.RPC_URL_MAINNET || clusterApiUrl("mainnet-beta");
  return new Connection(rpcUrl);
}

// Function to handle POST requests for donation
async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const donationRequest = req.body as DonationRequest;

    // Validate the donation request
    const validationError = validateDonationRequest(donationRequest);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Process the donation
    const connection = getConnection();
    const result: DonationResponse = await handleDonation(donationRequest, connection);

    // Return success or error response
    if (result.success) {
      return res.status(200).json({
        message: DONATION_MESSAGE,
        transactionSignature: result.transactionSignature,
      });
    } else {
      return res.status(400).json({ error: result.errorMessage });
    }
  } catch (error) {
    console.error("Donation processing error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Function to handle different HTTP methods
async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await handlePostRequest(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      break;
  }
}

// Main route handler function
export async function donateRouteHandler(req: NextApiRequest, res: NextApiResponse) {
  await handleRequest(req, res);
}
