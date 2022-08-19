export class UserNotFoundError extends Error {
  constructor (userId: string) {
    super(`O usuário ${userId} não foi encontrado.`);
    this.name = 'UserNotFoundError';
  }
}
