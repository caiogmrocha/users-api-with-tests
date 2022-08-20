import { objectIsEmpty } from '@/core/helpers';
import { IController } from '@/core/http/i-controller';
import { clientError, HttpResponse, notFound, ok, unprocessable } from '@/core/http/i-http-response';
import { Either, left, right } from '@/core/logic/Either';
import { UserNotFoundError } from '@/repositories/users/errors/user-not-found-error';
import { ValidationError } from '@/validation/errors/validation-error';
import { EmailValidator } from '@/validation/rules/email';
import { MinimumValueValidator } from '@/validation/rules/minimum-value';
import { RequiredFieldValidator } from '@/validation/rules/required-field';
import { ValidationCompositor } from '@/validation/validation-compositor';
import { UpdateUserUseCase } from './update-user-use-case';

export interface IUpdateUserControllerRequest {
  id: string | number;
  name: string;
  email: string;
  password: string;
}

export class UpdateUserController implements IController<IUpdateUserControllerRequest> {
  constructor (
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async handle (request: IUpdateUserControllerRequest): Promise<HttpResponse> {
    const validationResult = await this.validate(request);

    if (validationResult.isLeft()) {
      return unprocessable(validationResult.value);
    }

    const userOrError = await this.updateUserUseCase.execute({
      id: String(request.id),
      name: request.name,
      email: request.email,
      password: request.password
    });

    if (userOrError.isLeft()) {
      const error = userOrError.value;

      switch (error.constructor) {
        case UserNotFoundError:
          return notFound(error);

        default:
          return clientError(error);
      }
    }

    return ok(userOrError.value);
  }

  async validate (request: IUpdateUserControllerRequest): Promise<Either<ValidationError, null>> {
    const { name, email, password } = request;

    const validationCompositor = new ValidationCompositor([
      new RequiredFieldValidator('name', name),

      new RequiredFieldValidator('email', email),
      new EmailValidator('email', email),

      new RequiredFieldValidator('password', password),
      new MinimumValueValidator('password', password, 8)
    ]);

    const result = validationCompositor.validate();

    if (objectIsEmpty(result.errors)) {
      return right(null);
    }

    return left(result);
  }
}
