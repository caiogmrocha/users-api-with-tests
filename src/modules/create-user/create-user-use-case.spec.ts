import { InMemoryCreateUserRepository } from "@/repositories/users/create-user/in-memory-create-user-repository"
import { ICreateUserDTO } from "./create-user-dto"
import { CreateUserUseCase } from "./create-user-use-case"

const makeSut = () => {
  const createUserRepository = new InMemoryCreateUserRepository()
  const sut = new CreateUserUseCase(createUserRepository)

  return { sut, createUserRepository }
}

describe('Create User Use Case', () => {
  it('should be able to create a new user', async () => {
    const { sut } = makeSut()
    const data: ICreateUserDTO = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }

    const result = await sut.execute(data)

    expect(result.isSuccess()).toBeTruthy();
    expect(result.value).toEqual({
      props: expect.objectContaining({
        id: expect.any(String),
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })
    });
  })
})
