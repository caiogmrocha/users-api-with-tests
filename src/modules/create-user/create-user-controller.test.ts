import { app } from '@/app';
import request from 'supertest';

describe('[e2e] Create User Controller', () => {
  it('should return 422 if invalid data is provided', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'any_name',
        email: 'invalid_email',
        password: 'password'
      })

    expect(response.status).toBe(422);
  })

  it('should return 201 if user data is created', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'any_name', // missing name param
        email: 'any@email.com',
        password: 'password'
      })

    expect(response.status).toBe(201);
  })
})
