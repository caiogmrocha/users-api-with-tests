import { User } from '@/entities/user'
import { ICreateUserDTO } from '@/modules/create-user/create-user-dto'

export interface ICreateUserRepository {
  execute(data: ICreateUserDTO): Promise<User>
}
