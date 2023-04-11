import { validateUser } from 'src/application/validators/users/validateUser';

import { UserMapper } from '@mappers/users/userMapper';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

interface IRequest {
  user_id: string;
  path: string;
}

interface IResponse {
  profile_image_url: string;
}

export class UpdateUserAvatarUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ user_id, path }: IRequest): Promise<IResponse> {
    const existingUser = await validateUser(user_id, this.usersRepository);

    const user = UserMapper.toDomain(existingUser);
    user.profile_image_url = `${path}`;

    return {
      profile_image_url: user.profile_image_url,
    };
  }
}
