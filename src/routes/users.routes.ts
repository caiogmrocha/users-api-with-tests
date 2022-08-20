import { adaptRoute } from '@/core/http/adapters/express-route-adapter';
import { makeCreateUserController } from '@/modules/create-user/create-user-controller-factory';
import { makeDeleteUserController } from '@/modules/delete-user/delete-user-controller-factory';
import { makeGetAllUsersController } from '@/modules/get-all-users/get-all-users-controller-factory';
import { makeGetUserByIdController } from '@/modules/get-user-by-id/get-user-by-id-controller-factory';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', adaptRoute(makeGetAllUsersController()));
usersRouter.get('/:id', adaptRoute(makeGetUserByIdController()));
usersRouter.post('/', adaptRoute(makeCreateUserController()));
usersRouter.delete('/:id', adaptRoute(makeDeleteUserController()));

export { usersRouter };
