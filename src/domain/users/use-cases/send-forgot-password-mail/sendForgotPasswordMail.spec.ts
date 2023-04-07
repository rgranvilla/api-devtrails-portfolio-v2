import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ResourceNotFoundError } from '@shared/errors/resourceNotFoundError';
import { IDateProvider } from '@shared/providers/date-provider/IDateProvider';
import { IMailProvider } from '@shared/providers/mail-provider/IMailProvider';

import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { DateProvider } from '@providers/date-provider';
import { MailProvider } from '@providers/mail-provider';
import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';
import { InMemoryUserTokensRepository } from '@repositories/users/in-memory/inMemoryUserTokensRepository';

import { SendForgotPasswordMailUseCase } from './sendForgotPasswordMail';

let sut: SendForgotPasswordMailUseCase;
let usersRepository: InMemoryUsersRepository;
let userTokensRepository: InMemoryUserTokensRepository;
let mailProvider: IMailProvider;
let dateProvider: IDateProvider;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userTokensRepository = new InMemoryUserTokensRepository();
    dateProvider = DateProvider();
    mailProvider = MailProvider();

    sut = new SendForgotPasswordMailUseCase(
      usersRepository,
      userTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = vi.spyOn(mailProvider, 'sendMail');

    const newUser = await createNewUserFactory();
    await usersRepository.create(newUser);

    await sut.execute(newUser.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(sut.execute('wrong@mail.com')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = vi.spyOn(userTokensRepository, 'create');

    const newUser = await createNewUserFactory();
    await usersRepository.create(newUser);

    await sut.execute('johndoe@mail.com');

    expect(generateTokenMail).toBeCalled();
  });
});
