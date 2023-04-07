import { beforeEach, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { UpdateUserUseCase } from './updateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should to update an user', async () => {
    const createdUser = await usersRepository.create(
      await createNewUserFactory({
        name: 'ADM Update User',
        email: 'adm-update-user@mail.com',
      }),
    );

    const { user } = await sut.execute({
      userId: createdUser.id,
      data: {
        role: 'admin',
      },
    });

    expect(user.role).toBe('admin');
  });

  it('should throw an error if resource not found', async () => {
    await expect(() =>
      sut.execute({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        data: {
          role: 'admin',
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
