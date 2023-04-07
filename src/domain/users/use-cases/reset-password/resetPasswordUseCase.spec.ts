import { compare } from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { IDateProvider } from '@core/providers/date-provider/IDateProvider';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { DateProvider } from '@providers/date-provider';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';
import { InMemoryUserTokensRepository } from '@repositories/users/in-memory/inMemoryUserTokensRepository';

import { ResetPasswordUseCase } from './resetPasswordUseCase';

let sut: ResetPasswordUseCase;
let usersRepository: InMemoryUsersRepository;
let userTokensRepository: InMemoryUserTokensRepository;
let dateProvider: IDateProvider;

describe('Reset Password', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userTokensRepository = new InMemoryUserTokensRepository();
    dateProvider = DateProvider();

    sut = new ResetPasswordUseCase(
      usersRepository,
      userTokensRepository,
      dateProvider,
    );
  });

  it('should be able to reset password', async () => {
    const newUser = await createNewUserFactory();
    await usersRepository.create(newUser);

    const expires_date = dateProvider.addMinutes(15);
    const token = randomUUID();

    await userTokensRepository.create({
      refresh_token: token,
      user_id: newUser.id,
      expires_date,
    });

    await sut.execute({
      token,
      password: '87654321',
    });

    const user = await usersRepository.findById(newUser.id);

    const passwordUpdatedMatched = await compare(
      '87654321',
      user?.password ?? '',
    );

    expect(passwordUpdatedMatched).toBeTruthy();
  });
});
