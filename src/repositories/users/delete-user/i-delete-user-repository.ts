import { Either } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { UserNotFoundError } from '../errors/user-not-found-error';

export interface IDeleteUserRepository {
  execute(id: string): Promise<Either<UserNotFoundError, User>>;
}
