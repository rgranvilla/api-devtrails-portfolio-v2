import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserSkillAlreadyExistsError } from '@errors/skills/userSkillAlreadyExistsError';

import { InMemorySkillsRepository } from '@repositories/skills/in-memory/inMemoryUserSkillsRepository';
import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';

import { CreateUserSkillUseCase } from './createUserSkillUseCase';

let sut: CreateUserSkillUseCase;
let userSkillsRepository: IUserSkillsRepository;

describe('CreateUserSkillUseCase', () => {
  const userSkill = {
    user_id: randomUUID(),
    name: 'skill_name',
    proficiency: 5,
    description: 'skill_description',
    skill_icon_url: 'skill_icon_url',
  };

  beforeEach(() => {
    userSkillsRepository = new InMemorySkillsRepository();
    sut = new CreateUserSkillUseCase(userSkillsRepository);
  });

  it('should create a new user skill', async () => {
    const result = await sut.execute({ ...userSkill });

    expect(result.userSkill.id).toEqual(expect.any(String));
    expect(result.userSkill.created_at).toEqual(expect.any(Date));
    expect(result.userSkill.updated_at).toEqual(expect.any(Date));
    expect(result.userSkill.user_id).toBe(userSkill.user_id);
    expect(result.userSkill.name).toBe(userSkill.name);
    expect(result.userSkill.proficiency).toBe(userSkill.proficiency);
    expect(result.userSkill.description).toBe(userSkill.description);
    expect(result.userSkill.skill_icon_url).toBe(userSkill.skill_icon_url);
  });

  it('should throw UserSkillAlreadyExistError if skill already exists', async () => {
    await sut.execute({ ...userSkill });
    await expect(() => sut.execute({ ...userSkill })).rejects.toBeInstanceOf(
      UserSkillAlreadyExistsError,
    );
  });
});
