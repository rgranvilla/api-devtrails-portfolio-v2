import { UserToken } from '@modules/users/entities/user-token';

import { ICreateUserTokenDTO } from '../dtos/create-user-token-dto';

export abstract class UserTokensRepository {
  abstract findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | null>;

  abstract findByRefreshToken(refresh_token: string): Promise<UserToken | null>;

  abstract deleteById(id: string): Promise<void>;

  abstract create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
}
