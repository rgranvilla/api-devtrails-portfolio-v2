import { DateProvider } from '@providers/date-provider';
import { MailProvider } from '@providers/mail-provider';

import { SendForgotPasswordMailUseCase } from '@modules/users/use-cases/send-forgot-password-mail/send-forgot-password-mail';

import { PrismaUserTokensRepository } from '../prisma-user-tokens-repository';
import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeSendForgotPasswordMailUseCase() {
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
