import { beforeEach, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { UpdateRoleUserUseCase } from './updateUserRoleUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateRoleUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateRoleUserUseCase(usersRepository);
  });

  it('should to update an user', async () => {
    const createdUser = await usersRepository.create(
      await createNewUserFactory({
        name: 'ADM Update User',
        email: 'adm-update-user@mail.com',
      }),
    );

    const { user } = await sut.execute({
      user_id: createdUser.id,
      data: {
        role: 'admin',
      },
    });

    expect(user.role).toBe('admin');
  });

  it('should throw an error if resource not found', async () => {
    await expect(() =>
      sut.execute({
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        data: {
          role: 'admin',
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
