import { DateProvider } from '@providers/date-provider';

import { ResetPasswordUseCase } from '@domain/users/use-cases/reset-password/resetPasswordUseCase';

import { PrismaUsersRepository } from '../prismaUsersRepository';
import { PrismaUserTokensRepository } from '../prismaUserTokensRepository';

export function buildResetPasswordUseCaseFactory() {
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
