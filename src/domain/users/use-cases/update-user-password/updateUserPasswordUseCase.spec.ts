import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { UpdatePasswordUserUseCase } from './updateUserPasswordUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: UpdatePasswordUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdatePasswordUserUseCase(usersRepository);
  });

  it('should to update password of an user', async () => {
    const createdUser = await usersRepository.create(
      await createNewUserFactory({
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
