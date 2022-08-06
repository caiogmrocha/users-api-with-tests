import { User } from "./user";

describe('User Entity', () => {
  it('should be able to create a new User instance' , () => {
    const sut = new User({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'any_password',
    });

    expect(sut.props).toHaveProperty('id')
  })
})
