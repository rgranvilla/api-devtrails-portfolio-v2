import { beforeEach, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { UpdateUserAvatarUseCase } from './updateUserAvatarUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserAvatarUseCase;

describe('Update User Avatar Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserAvatarUseCase(usersRepository);
  });

  it('should to update an user avatar', async () => {
    const createdUser = await usersRepository.create(
      await createNewUserFactory({
        name: 'ADM Update User',
        email: 'adm-update-user@mail.com',
      }),
    );

    const { profile_image_url } = await sut.execute({
      user_id: createdUser.id,
      path: 'new url path',
    });

    expect(profile_image_url).toBe('new url path');
  });

  it('should throw an error if resource not found', async () => {
    await expect(() =>
      sut.execute({
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        path: 'new url path',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
