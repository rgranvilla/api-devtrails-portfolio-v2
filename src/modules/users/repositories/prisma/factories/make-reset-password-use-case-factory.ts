import { DateProvider } from '@providers/date-provider';

import { ResetPasswordUseCase } from '@modules/users/use-cases/reset-password/reset-password-use-case';

import { PrismaUserTokensRepository } from '../prisma-user-tokens-repository';
import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const userTokensRepository = new PrismaUserTokensRepository();
  const dateProvider = DateProvider();
  const resetPasswordUseCase = new ResetPasswordUseCase(
    usersRepository,
    userTokensRepository,
    dateProvider,
  );

  return resetPasswordUseCase;
}
