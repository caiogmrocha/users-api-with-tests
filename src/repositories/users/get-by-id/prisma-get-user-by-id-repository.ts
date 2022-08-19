import { Either, left, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { prisma } from '@/repositories/prisma';
import { UserNotFoundError } from './errors/user-not-found-error';
import { IGetUserByIdRepository } from './i-get-user-by-id-repository';

export class PrismaGetUserByIdRepository implements IGetUserByIdRepository {
  async execute (id: string): Promise<Either<Error, User>> {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (user) {
      return right(new User({
        name: user.name,
        email: user.email,
        password: user.password
      }));
    }

    return left(new UserNotFoundError(id));
  }
}
