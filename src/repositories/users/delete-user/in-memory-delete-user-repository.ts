import { Either, left, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { IDeleteUserRepository } from './i-delete-user-repository';

export class InMemoryDeleteUserRepository implements IDeleteUserRepository {
  constructor (
    private users: User[] = []
  ) {}

  async execute (id: string): Promise<Either<UserNotFoundError, User>> {
    const user = this.users.find(user => user.props.id === id);

    if (!user) {
      return left(new UserNotFoundError(id));
    }

    this.users = this.users.filter(user => user.props.id !== id);

    return right(user);
  }
}
