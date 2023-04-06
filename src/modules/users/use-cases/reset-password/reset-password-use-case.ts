import { createHashPassword } from '@utils/create-hash-password';

import { IDateProvider } from '@providers/date-provider/interface-date-provider';

import { User } from '@modules/users/entities/user';
import { TokenExpiredError } from '@modules/users/errors/token-expired-error';
import { TokenInvalidError } from '@modules/users/errors/token-invalid-error';
import { UserTokensRepository } from '@modules/users/repositories/user-tokens-repository';
import { UsersRepository } from '@modules/users/repositories/users-repository';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordUseCase {
  constructor(
    private userRepository: UsersRepository,
    private userTokensRepository: UserTokensRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new TokenInvalidError();
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new TokenExpiredError();
    }

    const user = (await this.userRepository.findById(
      userToken.user_id,
    )) as User;

    user.password = await createHashPassword(password);

    await this.userRepository.save(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
