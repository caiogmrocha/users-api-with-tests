import { User } from '@/entities/user';
import { IGetAllUsersRepository } from './i-get-all-users-repository';

export class InMemoryGetAllUsersRepository implements IGetAllUsersRepository {
  constructor (
    private readonly users: User[] = []
  ) {}

  async execute (): Promise<User[]> {
    return this.users;
  }
}
