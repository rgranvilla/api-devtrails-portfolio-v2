import { compare } from 'bcryptjs';

import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';

import { User } from '@domain/users/entities/user';

export async function validateUserPassword(
  user: User,
  passwordToValidate: string,
) {
  const doesPasswordMatches = await compare(passwordToValidate, user.password);

  if (!doesPasswordMatches) {
    throw new InvalidCredentialsError();
  }

  return doesPasswordMatches;
}
