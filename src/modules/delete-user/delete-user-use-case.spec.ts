import { User } from "@/entities/user"
import { IDeleteUserRepository } from "@/repositories/users/delete-user/i-delete-user-repository"
import { InMemoryDeleteUserRepository } from "@/repositories/users/delete-user/in-memory-delete-user-repository"
import { UserNotFoundError } from "@/repositories/users/errors/user-not-found-error"
import { DeleteUserUseCase } from "./delete-user-use-case"

type SutTypes = {
  deleteUserRepository: IDeleteUserRepository,
  sut: DeleteUserUseCase
}

const makeSut = (users: User[]): SutTypes => {
  const deleteUserRepository = new InMemoryDeleteUserRepository()
  const sut = new DeleteUserUseCase(deleteUserRepository)

  return {
    deleteUserRepository,
    sut,
  }
}

describe('Delete User Use Case', () => {
  it('should return UserNotFoundError if user does not exists', async () => {
    const { sut } = makeSut([
      new User({ id: '1', name: 'John Doe', email: 'john@doe.com', password: 'password' }),
      new User({ id: '2', name: 'Ana Victoria', email: 'ana@bell.com', password: 'password' }),
    ])

    const userOrError = await sut.execute('3')

    expect(userOrError.isLeft()).toBeTruthy()
    expect(userOrError.value).toEqual(new UserNotFoundError('3'))
  })
})
