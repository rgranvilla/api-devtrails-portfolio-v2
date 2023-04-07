import { prisma } from '@database/lib';

import { ICreateUserSkillDTO } from '@dtos/skills/ICreateUserSkillDto';
import { UserSkillMapper } from '@mappers/skills/userSkillMapper';

import { UserSkill } from '@domain/skills/entities/userSkill';

import { IUserSkillsRepository } from '../IUserSkillsRepository';

export class PrismaUserSkillsRepository implements IUserSkillsRepository {
  async findBySkillId(skill_id: string): Promise<UserSkill | null> {
    const existingUserSkill = await prisma.usersSkill.findUnique({
      where: {
        id: skill_id,
      },
    });

    if (!existingUserSkill) {
      return null;
    }

    return UserSkillMapper.toDomain(existingUserSkill);
  }

  async findByUserId(user_id: string): Promise<UserSkill[] | null> {
    throw new Error('Method not implemented.');
  }
  async findByNameAndUserId(
    name: string,
    user_id: string,
  ): Promise<UserSkill | null> {
    const existingUserSkill = await prisma.usersSkill.findFirst({
      where: {
        name,
        user_id,
      },
    });

    if (!existingUserSkill) {
      return null;
    }

    return UserSkillMapper.toDomain(existingUserSkill);
  }
  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateSkill(skill_id: string, data: UserSkill): Promise<UserSkill> {
    const result = await prisma.usersSkill.update({
      where: {
        id: skill_id,
      },
      data: UserSkillMapper.toDatabase(data),
    });

    return UserSkillMapper.toDomain(result);
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

    await prisma.usersSkill.create({
      data: UserSkillMapper.toDatabase(userSkill),
    });

    return userSkill;
  }
}
