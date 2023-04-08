import { UserSkill } from '@domain/skills/entities/userSkill';

export abstract class IUserSkillsRepository {
  abstract findBySkillId(skill_id: string): Promise<UserSkill | null>;

  abstract findByUserId(user_id: string): Promise<UserSkill[] | null>;

  abstract findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<UserSkill | null>;

  abstract deleteById(skill_id: string): Promise<void>;

  abstract updateSkill(skill_id: string, data: UserSkill): Promise<UserSkill>;

  abstract create(userSkill: UserSkill): Promise<UserSkill>;
}
