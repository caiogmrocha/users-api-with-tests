import { User } from '../../../entities/user';
import { ICreateUserDTO } from '../../../modules/create-user/create-user-dto';
import { ICreateUserRepository } from './i-create-user-repository';

export class InMemoryCreateUserRepository implements ICreateUserRepository {
  private users: User[] = [];

  async execute (data: ICreateUserDTO): Promise<User> {
    const user = new User(data);

    this.users.push(user);

    return user;
  }
}
