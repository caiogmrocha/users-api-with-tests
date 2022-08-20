import { IController } from '@/core/http/i-controller';
import { PrismaGetUserByIdRepository } from '@/repositories/users/get-by-id/prisma-get-user-by-id-repository';
import { PrismaUpdateUserRepository } from '@/repositories/users/update-user/prisma-update-user-repository';
import { UpdateUserController } from './update-user-controller';
import { UpdateUserUseCase } from './update-user-use-case';

export const makeUpdateUserController = (): IController => {
  const prismaUpdateUserRepository = new PrismaUpdateUserRepository();
  const prismaGetUserByIdRepository = new PrismaGetUserByIdRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUpdateUserRepository, prismaGetUserByIdRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
