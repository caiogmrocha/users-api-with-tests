import { User } from "@/entities/user"
import { IGetAllUsersRepository } from "@/repositories/users/get-all-users/i-get-all-users-repository"
import { InMemoryGetAllUsersRepository } from "@/repositories/users/get-all-users/in-memory-get-all-users-repository"
import { GetAllUsersUseCase } from "./get-all-users-use-case"

type SutTypes = {
  sut: GetAllUsersUseCase,
  getAllUsersRepository: IGetAllUsersRepository,
}

const makeSut = (users: User[] = []): SutTypes => {
  const getAllUsersRepository = new InMemoryGetAllUsersRepository(users);
  const sut = new GetAllUsersUseCase(getAllUsersRepository);

  return {
    getAllUsersRepository,
    sut,
  }
}

describe('Get All Users Use Case', () => {
  it('should be able to get all users', async () => {
    const { sut } = makeSut([
      new User({ name: 'John Doe', email: 'john@doe.com', password: 'password' }),
      new User({ name: 'Ana Victoria', email: 'ana@bell.com', password: 'password' }),
    ])

    const users = await sut.execute();

    expect(users.isRight()).toBeTruthy()
    expect(users.value).toEqual(expect.arrayContaining([
      {
        props: expect.objectContaining({
          id: expect.any(String),
          name: 'John Doe',
          email: 'john@doe.com',
          password: 'password'
        })
      },
      {
        props: expect.objectContaining({
          id: expect.any(String),
          name: 'Ana Victoria',
          email: 'ana@bell.com',
          password: 'password'
        })
      }
    ]))
  })
})
