import { beforeEach, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { GetUserProfileUseCase } from './getUserProfileUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create(
      await createNewUserFactory({
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
