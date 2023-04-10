import { compare } from 'bcryptjs';
import { validateUser } from 'src/application/validators/users/validateUser';

import { passwordHashing } from '@core/utils/passwordHashing';

import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

interface IRequest {
  user_id: string;
  data: {
    new_password: string;
    old_password: string;
  };
}

interface IResponse {
  user: User;
  password: string;
}

export class UpdatePasswordUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ user_id, data }: IRequest): Promise<IResponse> {
    const existingUser = await validateUser(user_id, this.usersRepository);

    const canUpdate = await compare(data.old_password, existingUser.password);

    if (!canUpdate) {
      throw new InvalidCredentialsError();
    }

    existingUser.password = await passwordHashing(data.new_password);

    const userData = await this.usersRepository.save(existingUser);

    return {
      user: userData,
      password: userData.password,
    };
  }
}
