import { Either } from '@/core/logic/Either';
import { User } from '@/entities/user';

export interface IUpdateUserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserRepository {
  execute(data: IUpdateUserData): Promise<Either<Error, User>>
}
