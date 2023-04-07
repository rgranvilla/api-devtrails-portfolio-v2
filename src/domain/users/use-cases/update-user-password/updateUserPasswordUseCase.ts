import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';
import { passwordHashing } from '@core/utils/passwordHashing';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

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
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
    data,
  }: IUpdatePasswordUserUseCaseRequest): Promise<IUpdatePasswordUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    user.password = await passwordHashing(data.password);

    const updatedUser = await this.usersRepository.save(user);

    return {
      user: updatedUser,
      newPassword: updatedUser.password,
    };
  }
}
