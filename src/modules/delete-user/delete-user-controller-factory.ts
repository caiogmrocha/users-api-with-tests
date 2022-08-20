import { IController } from '@/core/http/i-controller';
import { PrismaDeleteUserRepository } from '@/repositories/users/delete-user/prisma-delete-user-repository';
import { DeleteUserController } from './delete-user-controller';
import { DeleteUserUseCase } from './delete-user-use-case';

export const makeDeleteUserController = (): IController => {
  const prismaDeleteUserRepository = new PrismaDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaDeleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};
