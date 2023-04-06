import { User } from '@modules/users/entities/user';
import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { UsersRepository } from '@modules/users/repositories/users-repository';

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
  constructor(private usersRepository: UsersRepository) {}

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
