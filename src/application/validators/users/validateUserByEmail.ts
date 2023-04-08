import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

export async function validateUserByEmail(
  email: string,
  usersRepository: IUsersRepository,
) {
  const existingUser = await usersRepository.findByEmail(email);
  if (!existingUser) {
    throw new InvalidCredentialsError();
  }

  return existingUser;
}
