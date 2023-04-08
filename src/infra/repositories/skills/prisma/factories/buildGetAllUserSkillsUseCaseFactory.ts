import { PrismaUsersRepository } from '@repositories/users/prisma/prismaUsersRepository';

import { GetAllUserSkillsUseCase } from '@domain/skills/use-cases/get-all-user-skills/getAllUserSkillsUseCase';

import { PrismaUserSkillsRepository } from '../prismaUserSkillsRepository';

export function buildGetAllUserSkillsUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const getAllUserSkillsUseCase = new GetAllUserSkillsUseCase(
    usersRepository,
    userSkillsRepository,
  );

  return getAllUserSkillsUseCase;
}
