import { User } from '../../../entities/user';
import { ICreateUserData, ICreateUserRepository } from './i-create-user-repository';

export class InMemoryCreateUserRepository implements ICreateUserRepository {
  private users: User[] = [];

  async execute (data: ICreateUserData): Promise<User> {
    const user = new User(data);

    this.users.push(user);

    return user;
  }
}
