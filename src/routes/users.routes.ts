import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', (request, response) => {
  return response.status(201).json({
    message: 'User Create'
  });
});

export { usersRouter };
