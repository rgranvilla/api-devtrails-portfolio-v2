import { createHashPassword } from '@utils/create-hash-password';

import { User } from '@modules/users/entities/user';
import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { UsersRepository } from '@modules/users/repositories/users-repository';

interface IUpdatePasswordUserUseCaseRequest {
  userId: string;
  data: {
    password: string;
  };
}

interface IUpdatePasswordUserUseCaseResponse {
  user: User;
  newPassword: string;
}

export class UpdatePasswordUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    data,
  }: IUpdatePasswordUserUseCaseRequest): Promise<IUpdatePasswordUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    user.password = await createHashPassword(data.password);

    const updatedUser = await this.usersRepository.save(user);

    return {
      user: updatedUser,
      newPassword: updatedUser.password,
    };
  }
}
