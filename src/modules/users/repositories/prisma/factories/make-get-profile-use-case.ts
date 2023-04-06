import { GetUserProfileUseCase } from '@modules/users/use-cases/get-user-profile/get-user-profile';

import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
