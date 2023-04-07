import { GetUserProfileUseCase } from '@domain/users/use-cases/get-user-profile/getUserProfileUseCase';

import { PrismaUsersRepository } from '../prismaUsersRepository';

export function buildGetUserProfileUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
