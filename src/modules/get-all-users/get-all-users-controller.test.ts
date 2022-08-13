import { app } from '@/app';
import { PrismaCreateUserRepository } from '@/repositories/users/create-user/prisma-create-user-repository';
import request from 'supertest';
import { CreateUserUseCase } from '../create-user/create-user-use-case';

describe('[e2e] Get All Users Controller', () => {
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

  it('should return 200 if be able to get all users', async () => {
    const response = await request(app).get('/users')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.arrayContaining([
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
