import { CreateUserUseCase } from '@modules/users/use-cases/create-user/create-user-use-cases';

import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
