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

  it('should be able to validate a User data' , () => {
    const sut = new User({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'any_password',
    });

    const result = sut.validate()

    expect(result.isRight()).toBeTruthy()
  })

  it('should throw if a invalid User data is provided' , () => {
    const sut = new User({
      name: '',
      email: '',
      password: '',
    });

    const result = sut.validate()

    expect(result.isLeft()).toBeTruthy()
  })
})
