import { beforeEach, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { InMemorySkillsRepository } from '@repositories/skills/in-memory/inMemoryUserSkillsRepository';
import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';

import { UpdateUserSkillUseCase } from './updateUserSkillUseCase';

let sut: UpdateUserSkillUseCase;
let userSkillsRepository: IUserSkillsRepository;

describe('CreateUserSkillUseCase', () => {
  beforeEach(() => {
    userSkillsRepository = new InMemorySkillsRepository();
    sut = new UpdateUserSkillUseCase(userSkillsRepository);
  });

  it('should create a new user skill', async () => {
    const existingUserSkill = await userSkillsRepository.create({
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'skill_name',
      proficiency: 5,
      description: 'skill_description',
      skill_icon_url: 'skill_icon_url',
    });

    const result = await sut.execute({
      skill_id: existingUserSkill.id,
      user_id: existingUserSkill.user_id,
      name: 'HTML 5',
      proficiency: 4,
      description: 'html5_description',
      skill_icon_url: 'html5_skill_icon_url',
    });

    expect(result.userSkill.id).toEqual(expect.any(String));
    expect(result.userSkill.created_at).toEqual(expect.any(Date));
    expect(result.userSkill.updated_at).toEqual(expect.any(Date));
    expect(result.userSkill.user_id).toBe(existingUserSkill.user_id);
    expect(result.userSkill.name).toBe('HTML 5');
    expect(result.userSkill.proficiency).toBe(4);
    expect(result.userSkill.description).toBe('html5_description');
    expect(result.userSkill.skill_icon_url).toBe('html5_skill_icon_url');
  });

  it('should throw an error if skill to updated doesnt exists', async () => {
    await expect(() =>
      sut.execute({
        skill_id: 'inexistent_skill_id',
        user_id: 'user_id',
        name: 'HTML 5',
        proficiency: 4,
        description: 'html5_description',
        skill_icon_url: 'html5_skill_icon_url',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
