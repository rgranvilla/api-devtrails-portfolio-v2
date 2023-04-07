import { DateProvider } from '@providers/date-provider';
import { MailProvider } from '@providers/mail-provider';

import { SendForgotPasswordMailUseCase } from '@domain/users/use-cases/send-forgot-password-mail/sendForgotPasswordMail';

import { PrismaUsersRepository } from '../prismaUsersRepository';
import { PrismaUserTokensRepository } from '../prismaUserTokensRepository';

export function buildSendForgotPasswordMailUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository();
  const userTokensRepository = new PrismaUserTokensRepository();
  const dateProvider = DateProvider();
  const mailProvider = MailProvider();
  const createUserUseCase = new SendForgotPasswordMailUseCase(
    usersRepository,
    userTokensRepository,
    dateProvider,
    mailProvider,
  );

  return createUserUseCase;
}
