import { PrismaUsersRepository } from '@repositories/users/prisma/prismaUsersRepository';

import { GetUserSkillByIdUseCase } from '@domain/skills/use-cases/get-user-skill-by-id/getUserSkillByIdUseCase';

import { PrismaUserSkillsRepository } from '../prismaUserSkillsRepository';

export function buildGetUserSkillByIdUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const getUserSkillByIdUseCase = new GetUserSkillByIdUseCase(
    usersRepository,
    userSkillsRepository,
  );

  return getUserSkillByIdUseCase;
}
