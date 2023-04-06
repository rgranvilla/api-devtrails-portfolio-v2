import { beforeEach, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { makeNewUser } from '@modules/users/factories/make-new-user';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/in-memory-users-repository';

import { UpdateUserUseCase } from './update-user-use-case';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should to update an user', async () => {
    const createdUser = await usersRepository.create(
      await makeNewUser({
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
