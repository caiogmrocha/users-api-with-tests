import { User } from "@/entities/user"
import { IGetUserByIdRepository } from "@/repositories/users/get-by-id/i-get-user-by-id-repository"
import { InMemoryGetUserByIdRepository } from "@/repositories/users/get-by-id/in-memory-get-user-by-id-repository"
import { GetUserByIdUseCase } from "./get-user-by-id-use-case"

type SutTypes = {
  getUserByIdRepository: IGetUserByIdRepository,
  sut: GetUserByIdUseCase,
}

const makeSut = (users: User[]): SutTypes => {
  const getUserByIdRepository = new InMemoryGetUserByIdRepository(users);
  const sut = new GetUserByIdUseCase(getUserByIdRepository);

  return {
    getUserByIdRepository,
    sut,
  }
}

describe('Get User By Id Use Case', () => {
  it('should be able to get user by id', async () => {
    const { sut } = makeSut([
      new User({ id: '1', name: 'John Doe', email: 'john@doe.com', password: 'password' }),
      new User({ id: '2', name: 'Ana Victoria', email: 'ana@bell.com', password: 'password' }),
    ])

    const userOrError = await sut.execute('1')

    expect(userOrError.isRight()).toBeTruthy();
    expect(userOrError.value).toEqual(new User({ id: '1', name: 'John Doe', email: 'john@doe.com', password: 'password' }))
  })
})
