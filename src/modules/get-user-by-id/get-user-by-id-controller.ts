import { IController } from '@/core/http/i-controller';
import { clientError, HttpResponse, notFound, ok } from '@/core/http/i-http-response';
import { UserNotFoundError } from '@/repositories/users/errors/user-not-found-error';
import { GetUserByIdUseCase } from './get-user-by-id-use-case';

export interface GetUserByIdControllerRequest {
  id: string
}

export class GetUserByIdController implements IController<GetUserByIdControllerRequest> {
  constructor (
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) {}

  async handle ({ id }: GetUserByIdControllerRequest): Promise<HttpResponse> {
    const userOrError = await this.getUserByIdUseCase.execute(id);

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
}
