import { objectIsEmpty } from '@/core/helpers';
import { IController } from '@/core/http/i-controller';
import { clientError, created, HttpResponse, serverError, unprocessable } from '@/core/http/i-http-response';
import { Either, left, right } from '@/core/logic/Either';
import { ValidationError } from '@/validation/errors/validation-error';
import { EmailValidator } from '@/validation/rules/email';
import { MinimumValueValidator } from '@/validation/rules/minimum-value';
import { RequiredFieldValidator } from '@/validation/rules/required-field';
import { ValidationCompositor } from '@/validation/validation-compositor';
import { CreateUserUseCase } from './create-user-use-case';

export interface CreateUserControllerRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserController implements IController<CreateUserControllerRequest> {
  constructor (
    private createUserUseCase: CreateUserUseCase
  ) {}

  async handle (request: CreateUserControllerRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validate(request);

      if (validationResult.isLeft()) {
        return unprocessable(validationResult.value);
      }

      const result = await this.createUserUseCase.execute(request);

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return created();
    } catch (error: any) {
      return serverError(error);
    }
  }

  async validate (request: CreateUserControllerRequest): Promise<Either<ValidationError, null>> {
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
