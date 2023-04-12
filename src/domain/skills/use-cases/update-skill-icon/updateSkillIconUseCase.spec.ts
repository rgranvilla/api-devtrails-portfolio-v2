import { beforeEach, describe, expect, it } from 'vitest';

import { createNewUserSkillFactory } from '@factories/skills/createNewUserSkillFactory';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemorySkillsRepository } from '@repositories/skills/in-memory/inMemoryUserSkillsRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';
import { User } from '@domain/users/entities/user';

import { UpdateSkillIconUseCase } from './updateSkillIconUseCase';

let userSkillsRepository: InMemorySkillsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: UpdateSkillIconUseCase;
let user: User;
let skill: UserSkill;

describe('Update User Avatar Use Case', () => {
  const dataToUpdate = {
    name: 'HTML 5',
    proficiency: 4,
    description: 'html5_description',
    skill_icon_url: 'html5_skill_icon_url',
  };

  beforeEach(async () => {
    userSkillsRepository = new InMemorySkillsRepository();
    sut = new UpdateSkillIconUseCase(userSkillsRepository);

    user = await createNewUserFactory();

    skill = await createNewUserSkillFactory({
      user_id: user.id,
      id: user.id,
      override: {
        name: 'skill_name',
        proficiency: 5,
        description: 'skill_description',
        skill_icon_url: 'skill_icon_url',
      },
    });

    await userSkillsRepository.create(skill);
  });

  it('should to update an user avatar', async () => {
    const { userSkill } = await sut.execute({
      user_id: user.id,
      skill_id: skill.id,
      path: 'new url path',
    });

    expect(userSkill.skill_icon_url).toBe('new url path');
  });
});
