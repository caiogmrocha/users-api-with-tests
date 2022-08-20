import { Either, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { prisma } from '@/repositories/prisma';
import { IUpdateUserData, IUpdateUserRepository } from './i-update-user-repository';

export class PrismaUpdateUserRepository implements IUpdateUserRepository {
  async execute ({ id, ...data }: IUpdateUserData): Promise<Either<Error, User>> {
    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data
    });

    return right(new User({
      id: String(user.id),
      name: user.name,
      email: user.email,
      password: user.password
    }));
  }
}
