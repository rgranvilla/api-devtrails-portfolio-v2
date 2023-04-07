import { CreateUserUseCase } from '@domain/users/use-cases/create-user/createUserUseCases';

import { PrismaUsersRepository } from '../prismaUsersRepository';

export function buildCreateUserUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
