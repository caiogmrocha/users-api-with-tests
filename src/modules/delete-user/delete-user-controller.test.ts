import { app } from '@/app';
import { PrismaCreateUserRepository } from '@/repositories/users/create-user/prisma-create-user-repository';
import { UserNotFoundError } from '@/repositories/users/errors/user-not-found-error';
import request from 'supertest';
import { CreateUserUseCase } from '../create-user/create-user-use-case';

describe('[e2e] Delete User Controller', () => {
  beforeAll(async () => {
    const prismaCreateUserRepository = new PrismaCreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(prismaCreateUserRepository);

    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    });

    await createUserUseCase.execute({
      name: 'Ana Victoria',
      email: 'ana@bell.com',
      password: 'password'
    });
  })

  it('should return 200 if user is deleted', async () => {
    const response = await request(app).delete('/users/2')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      props: expect.objectContaining({
        id: expect.any(String),
        name: 'Ana Victoria',
        email: 'ana@bell.com',
        password: 'password'
      })
    })
  })

  it('should return 404 if user does not exists', async () => {
    const response = await request(app).delete('/users/3')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      error: { name: UserNotFoundError.name }
    })
  })
})
