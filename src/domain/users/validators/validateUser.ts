import { UserWithThisIdNotFoundError } from '@errors/users/userWithThisIdNotFoundError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

export async function validateUser(
  user_id: string,
  usersRepository: IUsersRepository,
) {
  const existingUser = await usersRepository.findById(user_id);
  if (!existingUser) {
    throw new UserWithThisIdNotFoundError(user_id);
  }

  return existingUser;
}
