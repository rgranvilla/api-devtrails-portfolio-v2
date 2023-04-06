import { PrismaUserSkillsRepository } from '@modules/skills/repositories/prisma/prisma-user-skills-repository';
import { CreateUserSkillUseCase } from '@modules/skills/use-cases/create-user-skill/create-user-skill-use-case';

export function makeCreateUserSkillUseCase() {
  const userSkillsRepository = new PrismaUserSkillsRepository();
  const createUserSkillUseCase = new CreateUserSkillUseCase(
    userSkillsRepository,
  );

  return createUserSkillUseCase;
}
