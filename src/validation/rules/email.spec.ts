import { InvalidEmailError } from "../errors/invalid-email-error"
import { EmailValidator } from "./email"

describe('Email Validator', () => {
  it('should return InvalidEmailError if a invalid email is provided', () => {
    const anyField = 'invalid_email'
    const sut = new EmailValidator('email', anyField)

    const error = sut.validate();

    expect(error).toEqual(new InvalidEmailError('email'))
  })

  it('should return undefined if a valid email is provided', () => {
    const anyField = 'valid@email.com'
    const sut = new EmailValidator('email', anyField)

    const error = sut.validate();

    expect(error).toBeUndefined();
  })
})
