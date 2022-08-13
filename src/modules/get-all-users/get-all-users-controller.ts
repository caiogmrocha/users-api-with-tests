import { IController } from '@/core/http/i-controller';
import { HttpResponse, ok, serverError } from '@/core/http/i-http-response';
import { GetAllUsersUseCase } from './get-all-users-use-case';

export class GetAllUsersController implements IController {
  constructor (
    private readonly getAllUsersUseCase: GetAllUsersUseCase
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const usersOrError = await this.getAllUsersUseCase.execute();

      return ok(usersOrError.value);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
