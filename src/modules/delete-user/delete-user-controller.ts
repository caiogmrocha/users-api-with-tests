import { IController } from '@/core/http/i-controller';
import { clientError, HttpResponse, notFound, ok } from '@/core/http/i-http-response';
import { UserNotFoundError } from '@/repositories/users/errors/user-not-found-error';
import { DeleteUserUseCase } from './delete-user-use-case';

export interface DeleteUserControllerRequest {
  id: number | string
}

export class DeleteUserController implements IController {
  constructor (
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  async handle ({ id }: DeleteUserControllerRequest): Promise<HttpResponse> {
    const userOrError = await this.deleteUserUseCase.execute(String(id));

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
