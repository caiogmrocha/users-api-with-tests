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
})
