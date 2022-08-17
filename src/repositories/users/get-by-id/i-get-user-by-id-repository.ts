import { Either } from '@/core/logic/Either';
import { User } from '@/entities/user';

export interface IGetUserByIdRepository {
  execute(id: string): Promise<Either<Error, User>>
}
