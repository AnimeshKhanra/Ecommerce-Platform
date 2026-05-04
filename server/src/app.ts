import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler.middlewares';
import { limiter } from './middlewares/rateLimiter.middlewares';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(errorHandler);

export default app;