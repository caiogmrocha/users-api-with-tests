import { Either } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { IGetUserByIdRepository } from '@/repositories/users/get-by-id/i-get-user-by-id-repository';

export class GetUserByIdUseCase {
  constructor (
    private readonly getUserByIdRepository: IGetUserByIdRepository
  ) {}

  async execute (id: string): Promise<Either<Error, User>> {
    const userOrError = await this.getUserByIdRepository.execute(id);

    return userOrError;
  }
}
