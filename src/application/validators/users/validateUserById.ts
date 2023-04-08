import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

export async function validateUserById(
  user_id: string,
  usersRepository: IUsersRepository,
) {
  const existingUser = await usersRepository.findById(user_id);
  if (!existingUser) {
    throw new UserWithThisIdNotFoundError(user_id);
  }

  return existingUser;
}
