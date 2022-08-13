import { User } from '@/entities/user';

export interface IGetAllUsersRepository {
  execute(): Promise<User[]>;
}
