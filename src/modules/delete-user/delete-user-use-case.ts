import { Either } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { IDeleteUserRepository } from '@/repositories/users/delete-user/i-delete-user-repository';
import { UserNotFoundError } from '@/repositories/users/errors/user-not-found-error';

export class DeleteUserUseCase {
  constructor (
    private readonly deleteUserRepository: IDeleteUserRepository
  ) {}

  async execute (id: string): Promise<Either<UserNotFoundError, User>> {
    const userOrError = await this.deleteUserRepository.execute(id);

    return userOrError;
  }
}
