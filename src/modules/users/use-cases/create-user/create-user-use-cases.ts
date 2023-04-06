import { createHashPassword } from '@utils/create-hash-password';

import { User } from '@modules/users/entities/user';
import { UserAlreadyExistsError } from '@modules/users/errors/user-already-exists-error';
import { UsersRepository } from '@modules/users/repositories/users-repository';

interface ICreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface ICreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHashed = await createHashPassword(password);

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
