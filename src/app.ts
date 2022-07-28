import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors({
  exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length']
}));

app.use(express.json({
  type: ['application/json', 'text/plain']
}));

app.get('/users', (request, response) => {
  return response.json({
    message: 'Hello World'
  });
});

export { app };
