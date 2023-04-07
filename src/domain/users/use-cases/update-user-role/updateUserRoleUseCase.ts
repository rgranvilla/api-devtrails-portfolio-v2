import { ResourceNotFoundError } from '@shared/errors/resourceNotFoundError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

interface IUpdateRoleUserUseCaseRequest {
  userId: string;
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
    userId,
    data,
  }: IUpdateRoleUserUseCaseRequest): Promise<IUpdateUsersUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    user.role = data.role;

    const updatedUser = await this.usersRepository.save(user);

    return {
      user: updatedUser,
    };
  }
}
