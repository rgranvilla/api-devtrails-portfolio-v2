import { UpdateUserSkillUseCase } from '@domain/skills/use-cases/update-user-skill/updateUserSkillUseCase';

import { PrismaUserSkillsRepository } from '../prismaUserSkillsRepository';

export function buildUpdateUserSkillUseCaseFactory() {
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const updateUserSkillUseCase = new UpdateUserSkillUseCase(
    userSkillsRepository,
  );

  return updateUserSkillUseCase;
}
