import { UserSkillWithThisIdNotFoundError } from '@errors/skills/userSkillWithThisIdNotFoundError';

import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';

export async function validateUserSkill(
  skill_id: string,
  userSkillsRepository: IUserSkillsRepository,
) {
  const existingUserSkill = await userSkillsRepository.findBySkillId(skill_id);
  if (!existingUserSkill) {
    throw new UserSkillWithThisIdNotFoundError(skill_id);
  }

  return existingUserSkill;
}
