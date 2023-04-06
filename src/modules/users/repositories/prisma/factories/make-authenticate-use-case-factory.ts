import { AuthenticateUseCase } from '@modules/users/use-cases/authenticate/authenticate-use-case';

import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
