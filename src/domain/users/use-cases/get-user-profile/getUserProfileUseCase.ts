import { ResourceNotFoundError } from '@core/errors/resourceNotFoundError';

import { IUserProps, UserMapper } from '@mappers/users/userMapper';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

interface IGetUserProfileUseCaseRequest {
  userId: string;
}

interface IGetUserProfileUseCaseResponse {
  user: Partial<IUserProps>;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const raw = await this.usersRepository.findById(userId);

    if (!raw) {
      throw new ResourceNotFoundError();
    }

    const user = UserMapper.toHttp(raw);

    return {
      user,
    };
  }
}
