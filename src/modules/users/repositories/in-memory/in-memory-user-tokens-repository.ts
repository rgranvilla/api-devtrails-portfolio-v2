import { ICreateUserTokenDTO } from '@modules/users/dtos/create-user-token-dto';
import { UserToken } from '@modules/users/entities/user-token';
import {
  IUserTokenProps,
  UserTokenMapper,
} from '@modules/users/mapper/user-token-mapper';

import { UserTokensRepository } from '../user-tokens-repository';

export class InMemoryUserTokensRepository implements UserTokensRepository {
  public items: IUserTokenProps[] = [];

  async findByUserId(user_id: string): Promise<UserToken[] | null> {
    const userTokens = this.items.filter((item) => item.user_id === user_id);

    if (!userTokens) {
      return null;
    }

    const allUserTokens = userTokens.map((item) =>
      UserTokenMapper.toDomain(item),
    );

    return allUserTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | null> {
    const userToken = this.items.find(
      (item) => item.refresh_token === refresh_token,
    );

    if (!userToken) {
      return null;
    }

    return UserTokenMapper.toDomain(userToken);
  }

  async deleteById(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    this.items.splice(index, 1);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken({
      expires_date,
      refresh_token,
      user_id,
    });

    this.items.push(userToken);

    return userToken;
  }
}
