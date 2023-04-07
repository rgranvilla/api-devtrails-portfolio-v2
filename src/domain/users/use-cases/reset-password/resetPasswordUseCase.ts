import { IDateProvider } from '@core/providers/date-provider/IDateProvider';
import { passwordHashing } from '@core/utils/passwordHashing';
import { TokenExpiredError } from '@errors/users/tokenExpiredError';
import { TokenInvalidError } from '@errors/users/tokenInvalidError';

import { IUsersRepository } from '@repositories/users/IUsersRepository';
import { IUserTokensRepository } from '@repositories/users/IUserTokensRepository';

import { User } from '@domain/users/entities/user';

interface IRequest {
  token: string;
  password: string;
}

interface IResponse {
  user: User;
}
export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<IResponse> {
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

    user.password = await passwordHashing(password);

    await this.userRepository.save(user);

    await this.userTokensRepository.deleteById(userToken.id);

    return {
      user,
    };
  }
}
