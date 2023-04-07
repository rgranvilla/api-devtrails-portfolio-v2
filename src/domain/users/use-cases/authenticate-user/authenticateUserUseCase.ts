import { compare } from 'bcryptjs';

import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

interface IAuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserUseCaseResponse {
  user: User;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserUseCaseRequest): Promise<IAuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
