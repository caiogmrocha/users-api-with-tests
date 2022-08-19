import { Either, left, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { UserNotFoundError } from './errors/user-not-found-error';
import { IGetUserByIdRepository } from './i-get-user-by-id-repository';

export class InMemoryGetUserByIdRepository implements IGetUserByIdRepository {
  constructor (
    private readonly users: User[] = []
  ) {}

  async execute (id: string): Promise<Either<Error, User>> {
    const user = this.users.find(user => user.props.id === id);

    if (user) {
      return right(user);
    }

    return left(new UserNotFoundError(id));
  }
}
