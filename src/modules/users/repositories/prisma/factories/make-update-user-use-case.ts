import { UpdateUserUseCase } from '@modules/users/use-cases/update-user/update-user-use-case';

import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  return updateUserUseCase;
}
