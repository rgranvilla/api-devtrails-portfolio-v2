import { UpdateUserAvatarUseCase } from '@domain/users/use-cases/update-user-avatar/updateUserAvatarUseCase';

import { PrismaUsersRepository } from '../prismaUsersRepository';

export function buildUpdateUserAvatarUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(usersRepository);

  return updateUserAvatarUseCase;
}
