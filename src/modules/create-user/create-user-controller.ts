import { objectIsEmpty } from '@/core/helpers';
import { IController } from '@/core/http/i-controller';
import { HttpResponse, unprocessable } from '@/core/http/i-http-response';
import { Either, left, right } from '@/core/logic/Either';
import { ValidationError } from '@/validation/errors/validation-error';
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
    const validationResult = await this.validate(request);

    if (validationResult.isLeft()) {
      return unprocessable(validationResult.value);
    }

    return {
      body: 'Error',
      statusCode: 400
    };
  }

  async validate (request: CreateUserControllerRequest): Promise<Either<ValidationError, null>> {
    const { name, email, password } = request;

    const validationCompositor = new ValidationCompositor([
      new RequiredFieldValidator('nome', name),
      new RequiredFieldValidator('email', email),
      new RequiredFieldValidator('senha', password)
    ]);

    const result = validationCompositor.validate();

    if (objectIsEmpty(result.errors)) {
      return right(null);
    }

    return left(result);
  }
}
