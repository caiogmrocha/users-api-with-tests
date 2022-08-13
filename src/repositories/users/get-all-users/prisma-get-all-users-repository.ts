import { User } from '@/entities/user';
import { prisma } from '@/repositories/prisma';
import { IGetAllUsersRepository } from './i-get-all-users-repository';

export class PrismaGetAllUsersRepository implements IGetAllUsersRepository {
  async execute (): Promise<User[]> {
    const queryResult = await prisma.user.findMany();
    const users = [];

    for (const user of queryResult) {
      users.push(new User({
        id: String(user.id),
        name: user.name,
        email: user.email,
        password: user.password
      }));
    }

    return users;
  }
}
