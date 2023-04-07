import { UpdateUserUseCase } from '@domain/users/use-cases/update-user/updateUserUseCase';

import { PrismaUsersRepository } from '../prismaUsersRepository';

export function buildUpdateUserUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  return updateUserUseCase;
}
