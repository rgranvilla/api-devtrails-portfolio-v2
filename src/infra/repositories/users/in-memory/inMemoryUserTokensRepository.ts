import { ICreateUserTokenDTO } from '@dtos/users/ICreateUserTokenDto';
import {
  IUserTokenProps,
  UserTokenMapper,
} from '@mappers/users/userTokenMapper';

import { UserToken } from '@domain/users/entities/userToken';

import { IUserTokensRepository } from '../IUserTokensRepository';

export class InMemoryUserTokensRepository implements IUserTokensRepository {
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
