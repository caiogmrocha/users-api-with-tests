import { MinimumValueError } from "../errors/minimum-value-error";
import { MinimumValueValidator } from "./minimum-value";

describe('Minimum Value Validator', () => {
  it('should return MinimumValueError if a invalid string is provided', () => {
    const anyField = 'John Doe';
    const minimumValue = 9
    const sut = new MinimumValueValidator('name', anyField, minimumValue);

    const error = sut.validate();

    expect(error).toEqual(new MinimumValueError('name', anyField, minimumValue))
  })

  it('should return undefined if a valid string is provided', () => {
    const anyField = 'John Doe';
    const minimumValue = 8
    const sut = new MinimumValueValidator('name', anyField, minimumValue);

    const error = sut.validate();

    expect(error).toBeUndefined()
  })

  it('should return MinimumValueError if a invalid number is provided', () => {
    const anyField = 100;
    const minimumValue = 199
    const sut = new MinimumValueValidator('price', anyField, minimumValue);

    const error = sut.validate();

    expect(error).toEqual(new MinimumValueError('price', anyField, minimumValue))
  })

  it('should return undefined if a valid number is provided', () => {
    const anyField = 100;
    const minimumValue = 99
    const sut = new MinimumValueValidator('price', anyField, minimumValue);

    const error = sut.validate();

    expect(error).toBeUndefined()
  })
})
