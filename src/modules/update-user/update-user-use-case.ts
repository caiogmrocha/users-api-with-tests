import { IGetUserByIdRepository } from '@/repositories/users/get-by-id/i-get-user-by-id-repository';
import { IUpdateUserRepository } from '@/repositories/users/update-user/i-update-user-repository';

export interface IUpdateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UpdateUserUseCase {
  constructor (
    private updateUserRepository: IUpdateUserRepository,
    private getUserByIdRepository: IGetUserByIdRepository
  ) {}

  async execute ({ id, ...data }: IUpdateUserDTO) {
    const userOrError = await this.getUserByIdRepository.execute(id);

    if (userOrError.isLeft()) {
      return userOrError;
    }

    const updatedUserOrError = await this.updateUserRepository.execute({ id, ...data });

    return updatedUserOrError;
  };
}
