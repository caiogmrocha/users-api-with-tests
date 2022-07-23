import { objectIsEmpty } from '@/helpers';
import { Either, failure, success } from '@/helpers/logic/Either';
import { ValidationError } from '@/validation/errors/validation-error';
import { RequiredFieldValidator } from '@/validation/rules/required-field';
import { ValidationCompositor } from '@/validation/validation-compositor';

export interface IUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  props: IUserProps;

  constructor (props: IUserProps) {
    if (!props.id) {
      props.id = `${Date.now()}`;
    }

    this.props = props;
  }

  public validate (): Either<ValidationError, any> {
    const { name, email, password } = this.props;

    const validationCompositor = new ValidationCompositor([
      new RequiredFieldValidator('nome', name),
      new RequiredFieldValidator('email', email),
      new RequiredFieldValidator('senha', password)
    ]);

    const result = validationCompositor.validate();

    if (objectIsEmpty(result.errors)) {
      return success({});
    }

    return failure(result);
  }
}
