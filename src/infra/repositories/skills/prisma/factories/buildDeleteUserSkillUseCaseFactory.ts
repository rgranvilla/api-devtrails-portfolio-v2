import { PrismaUsersRepository } from '@repositories/users/prisma/prismaUsersRepository';

import { DeleteUserSkillUseCase } from '@domain/skills/use-cases/delete-user-skill/deleteUserSkillUseCase';

import { PrismaUserSkillsRepository } from '../prismaUserSkillsRepository';

export function buildDeleteUserSkillUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const deleteUserSkillUseCase = new DeleteUserSkillUseCase(
    usersRepository,
    userSkillsRepository,
  );

  return deleteUserSkillUseCase;
}
