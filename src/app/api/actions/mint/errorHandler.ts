import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from './const';

// Custom Error Class for HTTP Errors
class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";

    // Ensure the stack trace is captured correctly
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Error Handler Middleware
const errorHandler = (
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    // Handle HTTP errors
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    // Handle general errors
    console.error('Unexpected Error:', err);
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

export { HttpError, errorHandler };
