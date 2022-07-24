import { User } from '@/entities/user';
import { Either, left, right } from '@/helpers/logic/Either';
import { ICreateUserRepository } from '@/repositories/users/create-user/i-create-user-repository';
import { ICreateUserDTO } from './create-user-dto';

export class CreateUserUseCase {
  private createUserRepository: ICreateUserRepository;

  constructor (createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async execute (data: ICreateUserDTO): Promise<Either<Error, User>> {
    if (!data.name) {
      return left(new Error('Missing param: name'));
    }

    if (!data.email) {
      return left(new Error('Missing param: email'));
    }

    if (!data.password) {
      return left(new Error('Missing param: password'));
    }

    const createdUser = await this.createUserRepository.execute(data);

    return right(createdUser);
  }
}
