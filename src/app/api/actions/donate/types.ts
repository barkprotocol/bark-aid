// actions/donate/types.ts

// Define the structure of a donation request
export interface DonationRequest {
    amount: number; // The amount of SOL to donate
    recipientAddress: string; // The recipient's public key address
    donorAddress: string; // The donor's public key address
    tokenMintAddress?: string; // Optional: The mint address of a specific token, if used
  }
  
  // Define the structure of a donation response
  export interface DonationResponse {
    success: boolean; // Indicates if the donation was successful
    transactionSignature?: string; // Optional: The transaction signature if the donation was successful
    errorMessage?: string; // Optional: Error message if the donation failed
  }
  
  // Define a type for validation errors
  export type ValidationError = string | null;
  
  // Define the structure for API error responses
  export interface ApiErrorResponse {
    error: string; // Error message to be returned in the response
  }
  
  // Define the structure for successful API responses
  export interface ApiSuccessResponse<T> {
    data: T; // Data to be returned in a successful response
  }
  