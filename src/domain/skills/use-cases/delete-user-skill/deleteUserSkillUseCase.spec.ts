import { beforeEach, describe, expect, it } from 'vitest';

import { UserSkillWithThisIdNotFoundError } from '@errors/skills/userSkillWithThisIdNotFoundError';
import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';
import { createNewUserSkillFactory } from '@factories/skills/createNewUserSkillFactory';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemorySkillsRepository } from '@repositories/skills/in-memory/inMemoryUserSkillsRepository';
import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';
import { User } from '@domain/users/entities/user';

import { DeleteUserSkillUseCase } from './deleteUserSkillUseCase';

let sut: DeleteUserSkillUseCase;
let usersRepository: IUsersRepository;
let userSkillsRepository: IUserSkillsRepository;

let user: User;
let userSkill: UserSkill;

describe('Delete User Skill Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    userSkillsRepository = new InMemorySkillsRepository();
    sut = new DeleteUserSkillUseCase(usersRepository, userSkillsRepository);

    user = await createNewUserFactory();
    await usersRepository.create(user);

    userSkill = await createNewUserSkillFactory({
      user_id: user.id,
      id: user.id,
      override: {
        name: 'skill_name',
        proficiency: 5,
        description: 'skill_description',
        skill_icon_url: 'skill_icon_url',
      },
    });

    await userSkillsRepository.create(userSkill);
  });

  it('should be able to delete an user skill', async () => {
    const { user_id, id } = userSkill;

    const existingUserSkillBeforeDelete =
      await userSkillsRepository.findBySkillId(id);

    expect(existingUserSkillBeforeDelete).toBeTruthy();

    await sut.execute({
      user_id,
      skill_id: id,
    });

    const existingUserSkillAfterDelete =
      await userSkillsRepository.findBySkillId(id);

    expect(existingUserSkillAfterDelete).toBeNull();
  });

  it('should throw an error if skill to updated doesnt exists', async () => {
    await expect(() =>
      sut.execute({
        skill_id: 'inexistent_skill_id',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(UserSkillWithThisIdNotFoundError);
  });

  it('should throw an error if user doesnt exists', async () => {
    await expect(() =>
      sut.execute({
        skill_id: 'any_valid_skill_id',
        user_id: 'inexistent_user_id',
      }),
    ).rejects.toBeInstanceOf(UserWithThisIdNotFoundError);
  });
});
