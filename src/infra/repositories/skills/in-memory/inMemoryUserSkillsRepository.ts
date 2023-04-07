import { ICreateUserSkillDTO } from '@dtos/skills/ICreateUserSkillDto';
import {
  IUserSkillProps,
  UserSkillMapper,
} from '@mappers/skills/userSkillMapper';

import { UserSkill } from '@domain/skills/entities/userSkill';

import { IUserSkillsRepository } from '../IUserSkillsRepository';

export class InMemorySkillsRepository implements IUserSkillsRepository {
  public items: IUserSkillProps[] = [];

  async findByUserId(userId: string): Promise<UserSkill[] | null> {
    const skills = this.items.filter((item) => item.user_id === userId);

    if (skills.length === 0) {
      return null;
    }

    const parsedSkills = skills.map((item) => UserSkillMapper.toDomain(item));

    return parsedSkills;
  }

  async findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<UserSkill | null> {
    const skill = this.items.find(
      (item) => item.user_id === userId && item.name === name,
    );

    if (!skill) {
      return null;
    }

    const parsedSkill = UserSkillMapper.toDomain(skill);

    return parsedSkill;
  }

  async deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateSkill(id: string): Promise<UserSkill> {
    throw new Error('Method not implemented.');
  }

  async create({
    user_id,
    name,
    proficiency = 0,
    description,
    skill_icon_url,
  }: ICreateUserSkillDTO): Promise<UserSkill> {
    const skill = new UserSkill({
      user_id,
      name,
      proficiency,
      description,
      skill_icon_url,
    });
    this.items.push(UserSkillMapper.toDatabase(skill));

    return skill;
  }
}
