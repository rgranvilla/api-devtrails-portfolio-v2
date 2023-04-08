import { prisma } from '@database/lib';

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
    const existingUserSkills = await prisma.usersSkill.findMany({
      where: {
        user_id,
      },
    });

    if (existingUserSkills.length === 0) {
      return null;
    }

    const userSkills = existingUserSkills.map((skill) =>
      UserSkillMapper.toDomain(skill),
    );

    return userSkills;
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

  async deleteById(id: string): Promise<void> {
    await prisma.usersSkill.delete({
      where: {
        id,
      },
    });
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

  async create(userSkill: UserSkill): Promise<UserSkill> {
    await prisma.usersSkill.create({
      data: UserSkillMapper.toDatabase(userSkill),
    });

    return userSkill;
  }
}
