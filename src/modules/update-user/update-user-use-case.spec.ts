import { User } from "@/entities/user"
import { UserNotFoundError } from "@/repositories/users/errors/user-not-found-error"
import { IGetUserByIdRepository } from "@/repositories/users/get-by-id/i-get-user-by-id-repository"
import { InMemoryGetUserByIdRepository } from "@/repositories/users/get-by-id/in-memory-get-user-by-id-repository"
import { IUpdateUserRepository } from "@/repositories/users/update-user/i-update-user-repository"
import { InMemoryUpdateUserRepository } from "@/repositories/users/update-user/in-memory-update-user-repository"
import { IUpdateUserDTO, UpdateUserUseCase } from "./update-user-use-case"

type SutTypes = {
  updateUserRepository: IUpdateUserRepository,
  getUserByIdRepository: IGetUserByIdRepository,
  sut: UpdateUserUseCase
}

const makeSut = (users: User[]): SutTypes => {
  const updateUserRepository = new InMemoryUpdateUserRepository(users)
  const getUserByIdRepository = new InMemoryGetUserByIdRepository(users)
  const sut = new UpdateUserUseCase(updateUserRepository, getUserByIdRepository)

  return {
    updateUserRepository,
    getUserByIdRepository,
    sut
  }
}

describe('Update User Use Case', () => {
  it('should return a User instance if user is updated', async () => {
    const { sut } = makeSut([
      new User({ id: '1', name: 'John Doe', email: 'john@doe.com', password: 'password' }),
      new User({ id: '2', name: 'Ana Victoria', email: 'ana@bell.com', password: 'password' }),
    ]);
    const data: IUpdateUserDTO = {
      id: '2',
      name: 'Ana Invictória',
      email: 'ana@invictoria.com',
      password: '87654321'
    }

    const userOrError = await sut.execute(data)

    expect(userOrError.isRight()).toBeTruthy()
    expect(userOrError.value).toEqual({
      props: data
    })
  })

  it('should return UserNotFoundError if user does not exists', async () => {
    const { sut } = makeSut([
      new User({ id: '1', name: 'John Doe', email: 'john@doe.com', password: 'password' }),
      new User({ id: '2', name: 'Ana Victoria', email: 'ana@bell.com', password: 'password' }),
    ]);
    const data: IUpdateUserDTO = {
      id: '3', // invalid id
      name: 'Ana Invictória',
      email: 'ana@invictoria.com',
      password: '87654321'
    }

    const userOrError = await sut.execute(data)

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(new UserNotFoundError('3'))
  })
})
