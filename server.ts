import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { handleError } from './src/app/utils/errors';

// Import route handlers
import transactionsRouter from './routes/transactions';
import voteRouter from './src/app/routes/vote';
import walletRouter from './src/app/routes/wallet';
import settingsRouter from './src/app/routes/settings';
import mintRouter from './src/app/routes/mint';
import paymentsRouter from './src/app/routes/payments';
import donateRouter from './src/app/routes/donate';
import stakeRouter from './src/app/routes/stake';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware
app.use(cors({
  origin: '*', // Adjust to specific origins if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Logging middleware
app.use(helmet()); // Set security-related HTTP headers

// Rate Limiting
app.use(rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // Default 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100, // Default max 100 requests
  message: 'Too many requests from this IP, please try again later.',
}));

// Use route handlers
app.use('/api/transactions', transactionsRouter);
app.use('/api/vote', voteRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/mint', mintRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/donate', donateRouter);
app.use('/api/stake', stakeRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(err, req, res, next);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
