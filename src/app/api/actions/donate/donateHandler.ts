// Define custom error types
export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400); // HTTP 400 Bad Request
    this.name = "ValidationError";
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404); // HTTP 404 Not Found
    this.name = "NotFoundError";
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500); // HTTP 500 Internal Server Error
    this.name = "InternalServerError";
  }
}

// Function to handle errors in API routes
export function handleApiError(error: unknown, res: NextApiResponse) {
  if (error instanceof CustomError) {
    // Handle known custom errors
    res.status(error.statusCode).json({ error: error.message });
  } else {
    // Handle unknown errors
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
  }
}
