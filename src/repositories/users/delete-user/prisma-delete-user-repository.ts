import { Either, left, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { prisma } from '@/repositories/prisma';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { IDeleteUserRepository } from './i-delete-user-repository';

export class PrismaDeleteUserRepository implements IDeleteUserRepository {
  async execute (id: string): Promise<Either<UserNotFoundError, User>> {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return left(new UserNotFoundError(id));
    }

    await prisma.user.delete({ where: { id: Number(id) } });

    return right(new User({
      id: String(user.id),
      name: user.name,
      email: user.email,
      password: user.password
    }));
  }
}
