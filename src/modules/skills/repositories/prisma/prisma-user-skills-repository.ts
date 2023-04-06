import { ICreateUserSkillDTO } from '@modules/skills/dtos/create-user-skill-dto';
import { UserSkill } from '@modules/skills/entities/user-skill';

import { UserSkillsRepository } from '../UserSkillsRepository';

export class PrismaUserSkillsRepository implements UserSkillsRepository {
  findByUserId(user_id: string): Promise<UserSkill[] | null> {
    throw new Error('Method not implemented.');
  }
  findByNameAndUserId(name: string, userId: string): Promise<UserSkill | null> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateSkill(id: string): Promise<UserSkill> {
    throw new Error('Method not implemented.');
  }
  create({
    user_id,
    name,
    description,
    skill_icon_url,
  }: ICreateUserSkillDTO): Promise<UserSkill> {
    throw new Error('Method not implemented.');
  }
}
