import { validateUserById } from 'src/application/validators/users/validateUserById';

import { IUserProps, UserMapper } from '@mappers/users/userMapper';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

interface IGetUserProfileUseCaseRequest {
  user_id: string;
}

interface IGetUserProfileUseCaseResponse {
  user: Partial<IUserProps>;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    user_id,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const existingUser = await validateUserById(user_id, this.usersRepository);

    const user = UserMapper.toHttp(existingUser);

    return {
      user,
    };
  }
}
