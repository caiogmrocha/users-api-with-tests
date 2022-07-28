import { User } from '@/entities/user';

export interface ICreateUserData {
  name: string,
  email: string,
  password: string,
}

export interface ICreateUserRepository {
  execute(data: ICreateUserData): Promise<User>
}
