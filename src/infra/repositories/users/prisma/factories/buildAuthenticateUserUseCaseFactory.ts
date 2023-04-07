import { AuthenticateUserUseCase } from '@domain/users/use-cases/authenticate-user/authenticateUserUseCase';

import { PrismaUsersRepository } from '../prismaUsersRepository';

export function buildAuthenticateUserUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUserUseCase(usersRepository);

  return authenticateUseCase;
}
