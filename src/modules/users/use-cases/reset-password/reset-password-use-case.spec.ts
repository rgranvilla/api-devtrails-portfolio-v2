import { compare } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it } from 'vitest';

import { DateProvider } from '@providers/date-provider';
import { IDateProvider } from '@providers/date-provider/interface-date-provider';

import { makeNewUser } from '@modules/users/factories/make-new-user';
import { InMemoryUserTokensRepository } from '@modules/users/repositories/in-memory/in-memory-user-tokens-repository';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/in-memory-users-repository';

import { ResetPasswordUseCase } from './reset-password-use-case';

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
    const newUser = await makeNewUser();
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
