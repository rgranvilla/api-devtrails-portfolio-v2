import { CreateUserSkillUseCase } from '@domain/skills/use-cases/create-user-skill/createUserSkillUseCase';

import { PrismaUserSkillsRepository } from '../prismaUserSkillsRepository';

export function buildCreateUserSkillUseCaseFactory() {
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const createUserSkillUseCase = new CreateUserSkillUseCase(
    userSkillsRepository,
  );

  return createUserSkillUseCase;
}
