import { Either, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { IGetAllUsersRepository } from '@/repositories/users/get-all-users/i-get-all-users-repository';

export class GetAllUsersUseCase {
  constructor (
    private readonly getAllUsersRepository: IGetAllUsersRepository
  ) {}

  public async execute (): Promise<Either<Error, User[]>> {
    const users = await this.getAllUsersRepository.execute();

    return right(users);
  }
}
