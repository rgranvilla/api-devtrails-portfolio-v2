import { UpdatePasswordUserUseCase } from '@modules/users/use-cases/update-password-user/update-password-user-use-case';

import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeUpdatePasswordUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updatePasswordUserUseCase = new UpdatePasswordUserUseCase(
    usersRepository,
  );

  return updatePasswordUserUseCase;
}
