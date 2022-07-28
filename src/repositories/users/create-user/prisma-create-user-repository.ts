import { User } from '@/entities/user';
import { prisma } from '@/repositories/prisma';
import { ICreateUserData, ICreateUserRepository } from './i-create-user-repository';

export class PrismaCreateUserRepository implements ICreateUserRepository {
  async execute (data: ICreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });

    console.log(user);

    return new User({
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}
