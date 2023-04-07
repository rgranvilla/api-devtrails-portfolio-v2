import { UpdatePasswordUserUseCase } from '@domain/users/use-cases/update-user-password/updateUserPasswordUseCase';

import { PrismaUsersRepository } from '../prismaUsersRepository';

export function buildUpdateUserPasswordUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const updatePasswordUserUseCase = new UpdatePasswordUserUseCase(
    usersRepository,
  );

  return updatePasswordUserUseCase;
}
