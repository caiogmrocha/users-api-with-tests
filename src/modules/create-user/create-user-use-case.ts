import { Either, right } from '@/core/logic/Either';
import { User } from '@/entities/user';
import { ICreateUserRepository } from '@/repositories/users/create-user/i-create-user-repository';

export interface ICreateUserDTO {
  name: string,
  email: string,
  password: string,
}

export class CreateUserUseCase {
  private createUserRepository: ICreateUserRepository;

  constructor (createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async execute (data: ICreateUserDTO): Promise<Either<Error, User>> {
    const createdUser = await this.createUserRepository.execute(data);

    return right(createdUser);
  }
}
