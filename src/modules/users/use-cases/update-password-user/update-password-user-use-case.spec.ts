import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { makeNewUser } from '@modules/users/factories/make-new-user';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/in-memory-users-repository';

import { UpdatePasswordUserUseCase } from './update-password-user-use-case';

let usersRepository: InMemoryUsersRepository;
let sut: UpdatePasswordUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdatePasswordUserUseCase(usersRepository);
  });

  it('should to update password of an user', async () => {
    const createdUser = await usersRepository.create(
      await makeNewUser({
        name: 'ADM Update User',
        email: 'adm-update-user@mail.com',
      }),
    );

    const { user, newPassword } = await sut.execute({
      userId: createdUser.id,
      data: {
        password: 'new-password',
      },
    });

    const passwordUpdatedMatched = await compare('new-password', newPassword);

    expect(passwordUpdatedMatched).toBeTruthy();
  });
});
