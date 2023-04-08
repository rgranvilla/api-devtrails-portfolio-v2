import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';

import { IUserTokensRepository } from '@repositories/users/IUserTokensRepository';

export async function validateRefreshToken(
  refresh_token: string,
  userTokensRepository: IUserTokensRepository,
) {
  const existingUserToken = await userTokensRepository.findByRefreshToken(
    refresh_token,
  );

  if (!existingUserToken) {
    throw new InvalidCredentialsError();
  }

  return existingUserToken;
}
