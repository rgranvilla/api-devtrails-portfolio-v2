import { prisma } from '@database/lib';

import { ICreateUserTokenDTO } from '@modules/users/dtos/create-user-token-dto';
import { UserToken } from '@modules/users/entities/user-token';
import { UserTokenMapper } from '@modules/users/mapper/user-token-mapper';
import { UserTokensRepository } from '@modules/users/repositories/user-tokens-repository';

export class PrismaUserTokensRepository implements UserTokensRepository {
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    });

    if (!userToken) {
      return null;
    }

    return UserTokenMapper.toDomain(userToken);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findUnique({
      where: {
        refresh_token,
      },
    });

    if (!userToken) {
      return null;
    }

    return UserTokenMapper.toDomain(userToken);
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userToken.delete({
      where: {
        id,
      },
    });
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const newUserToken = new UserToken({
      expires_date,
      refresh_token,
      user_id,
    });

    const raw = UserTokenMapper.toDatabase(newUserToken);

    await prisma.userToken.create({
      data: raw,
    });

    return UserTokenMapper.toDomain(raw);
  }
}
