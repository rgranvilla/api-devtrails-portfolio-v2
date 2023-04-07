import { ICreateUserSkillDTO } from '@dtos/skills/ICreateUserSkillDto';

import { UserSkill } from '@domain/skills/entities/userSkill';

import { IUserSkillsRepository } from '../IUserSkillsRepository';

export class PrismaUserSkillsRepository implements IUserSkillsRepository {
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
