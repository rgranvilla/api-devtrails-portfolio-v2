import { ICreateUserSkillDTO } from '@dtos/skills/ICreateUserSkillDto';
import {
  IUserSkillProps,
  UserSkillMapper,
} from '@mappers/skills/userSkillMapper';

import { UserSkill } from '@domain/skills/entities/userSkill';

import { IUserSkillsRepository } from '../IUserSkillsRepository';

export class InMemorySkillsRepository implements IUserSkillsRepository {
  public items: IUserSkillProps[] = [];

  async findBySkillId(skill_id: string): Promise<UserSkill | null> {
    const existingUserSkill = await this.items.find(
      (item) => item.id === skill_id,
    );

    if (!existingUserSkill) {
      return null;
    }

    return UserSkillMapper.toDomain(existingUserSkill);
  }

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
    const existingUserSkill = this.items.find(
      (item) => item.user_id === userId && item.name === name,
    );

    if (!existingUserSkill) {
      return null;
    }

    return UserSkillMapper.toDomain(existingUserSkill);
  }

  async deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateSkill(skill_id: string, data: UserSkill): Promise<UserSkill> {
    const userSkillIndex = this.items.findIndex((item) => item.id === skill_id);

    const userSkillToUpdate = UserSkillMapper.toDatabase(data);

    this.items[userSkillIndex] = {
      ...userSkillToUpdate,
    };

    return data;
  }

  async create({
    user_id,
    name,
    proficiency = 0,
    description,
    skill_icon_url,
  }: ICreateUserSkillDTO): Promise<UserSkill> {
    const userSkill = new UserSkill({
      user_id,
      name,
      proficiency,
      description,
      skill_icon_url,
    });
    this.items.push(UserSkillMapper.toDatabase(userSkill));

    return userSkill;
  }
}
