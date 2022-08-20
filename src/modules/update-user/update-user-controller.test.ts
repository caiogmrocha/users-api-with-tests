import { app } from '@/app';
import { PrismaCreateUserRepository } from '@/repositories/users/create-user/prisma-create-user-repository';
import request from 'supertest';
import { CreateUserUseCase } from '../create-user/create-user-use-case';

describe('[e2e] Update User Controller', () => {
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

  it('should return 422 if invalid data is provided', async () => {
    const requestData = {
      name: '',
      email: 'john@doe.com',
      password: '12345678'
    }
    const response = await request(app).put('/users/1').send(requestData)

    expect(response.status).toBe(422)
  })
})
