import { ICreateUserSkillDTO } from '@modules/skills/dtos/create-user-skill-dto';
import { UserSkill } from '@modules/skills/entities/user-skill';

export abstract class UserSkillsRepository {
  abstract findByUserId(user_id: string): Promise<UserSkill[] | null>;

  abstract findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<UserSkill | null>;

  abstract deleteById(id: string): Promise<void>;

  abstract updateSkill(id: string): Promise<UserSkill>;

  abstract create({
    user_id,
    name,
    description,
    skill_icon_url,
  }: ICreateUserSkillDTO): Promise<UserSkill>;
}
