import { beforeEach, describe, expect, it } from 'vitest';

import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';
import { createNewUserSkillFactory } from '@factories/skills/createNewUserSkillFactory';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { UserSkillMapper } from '@mappers/skills/userSkillMapper';

import { InMemorySkillsRepository } from '@repositories/skills/in-memory/inMemoryUserSkillsRepository';
import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

import { GetAllUserSkillsUseCase } from './getAllUserSkillsUseCase';

let sut: GetAllUserSkillsUseCase;
let usersRepository: IUsersRepository;
let userSkillsRepository: IUserSkillsRepository;

let user: User;

describe('Get All User Skills Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    userSkillsRepository = new InMemorySkillsRepository();
    sut = new GetAllUserSkillsUseCase(usersRepository, userSkillsRepository);

    user = await createNewUserFactory();
    await usersRepository.create(user);

    const firstSkill = await createNewUserSkillFactory({
      user_id: user.id,
      id: user.id,
      override: {
        name: 'HTML 5',
        proficiency: 5,
      },
    });

    const secondSkill = await createNewUserSkillFactory({
      user_id: user.id,
      id: user.id,
      override: {
        name: 'CSS 3',
        proficiency: 5,
      },
    });

    await userSkillsRepository.create(firstSkill);
    await userSkillsRepository.create(secondSkill);
  });

  it('should be able to show all user skills', async () => {
    const user_id = user.id;

    const { userSkills } = await sut.execute({
      user_id,
    });
    console.log(userSkills?.map((skill) => UserSkillMapper.toHttp(skill)));

    expect(userSkills?.length).toBe(2);
    if (userSkills) {
      expect(userSkills[0].name).toBe('HTML 5');
      expect(userSkills[1].name).toBe('CSS 3');
    }
  });

  it('should throw an error if user doesnt exists', async () => {
    await expect(() =>
      sut.execute({
        user_id: 'inexistent_user_id',
      }),
    ).rejects.toBeInstanceOf(UserWithThisIdNotFoundError);
  });
});
