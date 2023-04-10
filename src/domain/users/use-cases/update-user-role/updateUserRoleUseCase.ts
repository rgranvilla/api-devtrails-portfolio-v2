import { validateUser } from 'src/application/validators/users/validateUser';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

interface IUpdateRoleUserUseCaseRequest {
  user_id: string;
  data: {
    role: 'admin' | 'creator' | 'subscriber';
  };
}

interface IUpdateUsersUseCaseResponse {
  user: User;
}

export class UpdateRoleUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    user_id,
    data,
  }: IUpdateRoleUserUseCaseRequest): Promise<IUpdateUsersUseCaseResponse> {
    const existingUser = await validateUser(user_id, this.usersRepository);

    existingUser.role = data.role;

    const updatedUser = await this.usersRepository.save(existingUser);

    return {
      user: updatedUser,
    };
  }
}
