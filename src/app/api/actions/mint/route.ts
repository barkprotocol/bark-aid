import { Router, Request, Response, NextFunction } from 'express';
import {
  MINT_CREATE_ENDPOINT,
  MINT_STATUS_ENDPOINT,
  MINT_CANCEL_ENDPOINT,
  MINT_REQUEST_TYPE,
  MINTING_SUCCESS_MESSAGE,
  MINTING_ERROR_MESSAGE,
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR
} from './const';
import { createMintRequest, checkMintStatus, cancelMintRequest } from './services';

// Define types for request bodies
interface MintRequestBody {
  // Add specific fields according to your API requirements
  requestId?: string; // Example field
  amount?: number; // Example field
}

// Initialize the router
const router = Router();

// Route handler for creating a mint request
router.post(MINT_CREATE_ENDPOINT, async (req: Request<{}, {}, MintRequestBody>, res: Response, next: NextFunction) => {
  try {
    const result = await createMintRequest(req.body);
    if (result.success) {
      res.status(HTTP_STATUS_OK).json({ message: MINTING_SUCCESS_MESSAGE });
    } else {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ message: MINTING_ERROR_MESSAGE });
    }
  } catch (error) {
    next(error);
  }
});

// Route handler for checking mint status
router.get(MINT_STATUS_ENDPOINT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = await checkMintStatus();
    res.status(HTTP_STATUS_OK).json(status);
  } catch (error) {
    next(error);
  }
});

// Route handler for canceling a mint request
router.post(MINT_CANCEL_ENDPOINT, async (req: Request<{}, {}, MintRequestBody>, res: Response, next: NextFunction) => {
  try {
    const result = await cancelMintRequest(req.body);
    if (result.success) {
      res.status(HTTP_STATUS_OK).json({ message: 'Mint canceled successfully!' });
    } else {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'Cancellation failed. Please try again.' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
