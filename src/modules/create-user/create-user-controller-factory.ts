import { IController } from '@/core/http/i-controller';
import { PrismaCreateUserRepository } from '@/repositories/users/create-user/prisma-create-user-repository';
import { CreateUserController } from './create-user-controller';
import { CreateUserUseCase } from './create-user-use-case';

export const makeCreateUserController = (): IController => {
  const prismaCreateUserRepository = new PrismaCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(prismaCreateUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
