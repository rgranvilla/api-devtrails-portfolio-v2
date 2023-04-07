import { PrismaUsersRepository } from '@repositories/users/prisma/prismaUsersRepository';

import { UpdateUserSkillUseCase } from '@domain/skills/use-cases/update-user-skill/updateUserSkillUseCase';

import { PrismaUserSkillsRepository } from '../prismaUserSkillsRepository';

export function buildUpdateUserSkillUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const updateUserSkillUseCase = new UpdateUserSkillUseCase(
    usersRepository,
    userSkillsRepository,
  );

  return updateUserSkillUseCase;
}
