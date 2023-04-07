import { beforeEach, describe, expect, it } from 'vitest';

import { UserSkillWithThisIdNotFoundError } from '@errors/skills/userSkillWithThisIdNotFoundError';
import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemorySkillsRepository } from '@repositories/skills/in-memory/inMemoryUserSkillsRepository';
import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

import { UpdateUserSkillUseCase } from './updateUserSkillUseCase';

let sut: UpdateUserSkillUseCase;
let usersRepository: IUsersRepository;
let userSkillsRepository: IUserSkillsRepository;
let user: User;

describe('CreateUserSkillUseCase', () => {
  const dataToUpdate = {
    name: 'HTML 5',
    proficiency: 4,
    description: 'html5_description',
    skill_icon_url: 'html5_skill_icon_url',
  };

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    userSkillsRepository = new InMemorySkillsRepository();
    sut = new UpdateUserSkillUseCase(usersRepository, userSkillsRepository);
    user = await createNewUserFactory();
    await usersRepository.create(user);
  });

  it('should create a new user skill', async () => {
    const existingUserSkill = await userSkillsRepository.create({
      user_id: user.id,
      name: 'skill_name',
      proficiency: 5,
      description: 'skill_description',
      skill_icon_url: 'skill_icon_url',
    });

    const result = await sut.execute({
      skill_id: existingUserSkill.id,
      user_id: existingUserSkill.user_id,
      data: dataToUpdate,
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
        user_id: user.id,
        data: dataToUpdate,
      }),
    ).rejects.toBeInstanceOf(UserSkillWithThisIdNotFoundError);
  });

  it('should throw an error if user doesnt exists', async () => {
    await expect(() =>
      sut.execute({
        skill_id: 'any_valid_skill_id',
        user_id: 'inexistent_user_id',
        data: dataToUpdate,
      }),
    ).rejects.toBeInstanceOf(UserWithThisIdNotFoundError);
  });
});
