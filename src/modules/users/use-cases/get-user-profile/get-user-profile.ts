import { ResourceNotFoundError } from '@modules/users/errors/resource-not-found-error';
import { IUserProps, UserMapper } from '@modules/users/mapper/user-mapper';
import { UsersRepository } from '@modules/users/repositories/users-repository';

interface IGetUserProfileUseCaseRequest {
  userId: string;
}

interface IGetUserProfileUseCaseResponse {
  user: Partial<IUserProps>;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

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
