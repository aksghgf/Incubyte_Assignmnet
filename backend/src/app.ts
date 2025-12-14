import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorMiddleware } from './middleware/error.middleware';
import routes from './routes';

const app: Application = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Sweet Shop API is running' });
});

// API Routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;

