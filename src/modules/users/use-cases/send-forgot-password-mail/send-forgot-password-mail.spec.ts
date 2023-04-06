import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DateProvider } from '@providers/date-provider';
import { IDateProvider } from '@providers/date-provider/interface-date-provider';
import { MailProvider } from '@providers/mail-provider';
import { IMailProvider } from '@providers/mail-provider/interface-mail-provider';

import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { makeNewUser } from '@modules/users/factories/make-new-user';
import { InMemoryUserTokensRepository } from '@modules/users/repositories/in-memory/in-memory-user-tokens-repository';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/in-memory-users-repository';

import { SendForgotPasswordMailUseCase } from './send-forgot-password-mail';

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

    const newUser = await makeNewUser();
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

    const newUser = await makeNewUser();
    await usersRepository.create(newUser);

    await sut.execute('johndoe@mail.com');

    expect(generateTokenMail).toBeCalled();
  });
});
