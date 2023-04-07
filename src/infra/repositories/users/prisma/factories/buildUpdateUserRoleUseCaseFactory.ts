import { UpdateRoleUserUseCase } from '@domain/users/use-cases/update-user-role/updateUserRoleUseCase';

import { PrismaUsersRepository } from '../prismaUsersRepository';

export function makeUpdateRoleUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateRoleUserUseCase = new UpdateRoleUserUseCase(usersRepository);

  return updateRoleUserUseCase;
}
