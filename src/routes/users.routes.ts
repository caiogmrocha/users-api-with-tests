import { adaptRoute } from '@/core/http/adapters/express-route-adapter';
import { makeCreateUserController } from '@/modules/create-user/create-user-controller-factory';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', adaptRoute(makeCreateUserController()));

export { usersRouter };
