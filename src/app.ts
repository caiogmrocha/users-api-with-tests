import cors from 'cors';
import express from 'express';
import { router } from './routes';

const app = express();

app.use(cors({
  exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length']
}));

app.use(express.json({
  type: ['application/json', 'text/plain']
}));

app.use(router);

export { app };
