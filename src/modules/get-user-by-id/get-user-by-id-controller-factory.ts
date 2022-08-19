import { IController } from '@/core/http/i-controller';
import { PrismaGetUserByIdRepository } from '@/repositories/users/get-by-id/prisma-get-user-by-id-repository';
import { GetUserByIdController } from './get-user-by-id-controller';
import { GetUserByIdUseCase } from './get-user-by-id-use-case';

export const makeGetUserByIdController = (): IController => {
  const prismaGetUserByIdRepository = new PrismaGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(prismaGetUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};
