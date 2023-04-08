import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';
import { createNewUserSkillFactory } from '@factories/skills/createNewUserSkillFactory';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemorySkillsRepository } from '@repositories/skills/in-memory/inMemoryUserSkillsRepository';
import { IUserSkillsRepository } from '@repositories/skills/IUserSkillsRepository';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';
import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { UserSkill } from '@domain/skills/entities/userSkill';
import { User } from '@domain/users/entities/user';

import { GetUserSkillByIdUseCase } from './getUserSkillByIdUseCase';

let sut: GetUserSkillByIdUseCase;
let usersRepository: IUsersRepository;
let userSkillsRepository: IUserSkillsRepository;

let user: User;
let firstSkill: UserSkill;
let secondSkill: UserSkill;

describe('Get All User Skills Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    userSkillsRepository = new InMemorySkillsRepository();
    sut = new GetUserSkillByIdUseCase(usersRepository, userSkillsRepository);

    user = await createNewUserFactory();
    await usersRepository.create(user);

    firstSkill = await createNewUserSkillFactory({
      user_id: user.id,
      id: randomUUID(),
      override: {
        name: 'HTML 5',
        proficiency: 5,
      },
    });

    secondSkill = await createNewUserSkillFactory({
      user_id: user.id,
      id: randomUUID(),
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

    //firstSkill
    const { userSkill: firstResponse } = await sut.execute({
      user_id,
      skill_id: firstSkill.id,
    });
    if (firstResponse) {
      expect(firstResponse.name).toBe('HTML 5');
    }

    //secondSkill
    const { userSkill: secondResponse } = await sut.execute({
      user_id,
      skill_id: secondSkill.id,
    });
    if (secondResponse) {
      expect(secondResponse.name).toBe('CSS 3');
    }
  });

  it('should throw an error if user doesnt exists', async () => {
    await expect(() =>
      sut.execute({
        user_id: 'inexistent_user_id',
        skill_id: firstSkill.id,
      }),
    ).rejects.toBeInstanceOf(UserWithThisIdNotFoundError);
  });
});
