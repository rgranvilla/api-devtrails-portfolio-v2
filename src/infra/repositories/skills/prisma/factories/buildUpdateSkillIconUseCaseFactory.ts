import { UpdateSkillIconUseCase } from '@domain/skills/use-cases/update-skill-icon/updateSkillIconUseCase';

import { PrismaUserSkillsRepository } from '../prismaUserSkillsRepository';

export function buildUpdateSkillIconUseCaseFactory() {
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const updateSkillIconUseCase = new UpdateSkillIconUseCase(
    userSkillsRepository,
  );

  return updateSkillIconUseCase;
}
