import { ICreateUserTokenDTO } from '@dtos/users/ICreateUserTokenDto';

import { UserToken } from '@domain/users/entities/userToken';

export abstract class IUserTokensRepository {
  abstract findByUserId(user_id: string): Promise<UserToken[] | null>;

  abstract findByRefreshToken(refresh_token: string): Promise<UserToken | null>;

  abstract deleteById(id: string): Promise<void>;

  abstract create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
}
