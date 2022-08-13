import { IController } from '@/core/http/i-controller';
import { PrismaGetAllUsersRepository } from '@/repositories/users/get-all-users/prisma-get-all-users-repository';
import { GetAllUsersController } from './get-all-users-controller';
import { GetAllUsersUseCase } from './get-all-users-use-case';

export const makeGetAllUsersController = (): IController => {
  const prismaGetAllUsersRepository = new PrismaGetAllUsersRepository();
  const getAllUsersUseCase = new GetAllUsersUseCase(prismaGetAllUsersRepository);
  const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

  return getAllUsersController;
};
