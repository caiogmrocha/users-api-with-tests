import { adaptRoute } from '@/core/http/adapters/express-route-adapter';
import { makeCreateUserController } from '@/modules/create-user/create-user-controller-factory';
import { makeGetAllUsersController } from '@/modules/get-all-users/get-all-users-controller-factory';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', adaptRoute(makeGetAllUsersController()));
usersRouter.post('/', adaptRoute(makeCreateUserController()));

export { usersRouter };
