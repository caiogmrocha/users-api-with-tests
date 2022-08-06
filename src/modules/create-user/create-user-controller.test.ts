import { app } from '@/app';
import request from 'supertest';

describe('[e2e] Create User Controller', () => {
  it('should return 422 if invalid data is provided', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: '', // missing name param
        email: 'any@email.com',
        password: 'password'
      })

    expect(response.status).toBe(422);
  })
})
