import { Either, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { IUpdateUserData, IUpdateUserRepository } from './i-update-user-repository';

export class InMemoryUpdateUserRepository implements IUpdateUserRepository {
  constructor (
    private users: User[] = []
  ) {}

  async execute ({ id, ...data }: IUpdateUserData): Promise<Either<Error, User>> {
    this.users = this.users.map(user => {
      if (user.props.id !== id) {
        return user;
      }

      return new User({ id, ...data });
    });

    return right(new User({ id, ...data }));
  }
}
