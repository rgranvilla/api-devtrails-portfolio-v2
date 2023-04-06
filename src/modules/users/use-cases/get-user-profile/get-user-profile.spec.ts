import { beforeEach, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/in-memory-users-repository';

import { makeNewUser } from '../../factories/make-new-user';
import { GetUserProfileUseCase } from './get-user-profile';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create(
      await makeNewUser({
        name: 'Get Profile',
        email: 'get-profile@mail.com',
      }),
    );

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('Get Profile');
    expect(user.email).toEqual('get-profile@mail.com');
    expect(user.phone_number).toBe(null);
    expect(user.role).toBe('subscriber');
    expect(user.updated_at).toEqual(expect.any(Date));
    expect(user.created_at).toEqual(expect.any(Date));
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
