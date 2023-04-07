import { passwordHashing } from '@core/utils/passwordHashing';
import { UserAlreadyExistsError } from '@errors/users/userAlreadyExistsError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';

import { User } from '@domain/users/entities/user';

interface ICreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface ICreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHashed = await passwordHashing(password);

    const createdUser = new User({
      name,
      email,
      password: passwordHashed,
    });

    await this.userRepository.create(createdUser);

    return {
      user: createdUser,
    };
  }
}
