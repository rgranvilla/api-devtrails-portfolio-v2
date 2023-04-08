import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';

import { IUserTokensRepository } from '@repositories/users/IUserTokensRepository';

export async function validateUserTokens(
  user_id: string,
  userTokensRepository: IUserTokensRepository,
) {
  const existingUserTokens = await userTokensRepository.findByUserId(user_id);
  if (existingUserTokens?.length === 0) {
    throw new InvalidCredentialsError();
  }

  return existingUserTokens;
}
