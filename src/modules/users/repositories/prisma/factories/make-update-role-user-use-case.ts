import { UpdateRoleUserUseCase } from '@modules/users/use-cases/update-role-user/update-role-user-use-case';

import { PrismaUsersRepository } from '../prisma-users-repository';

export function makeUpdateRoleUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateRoleUserUseCase = new UpdateRoleUserUseCase(usersRepository);

  return updateRoleUserUseCase;
}
