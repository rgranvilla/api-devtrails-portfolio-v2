import { prisma } from '@database/lib';

import { UserTokenMapper } from '@mappers/users/userTokenMapper';

import { UserToken } from '@domain/users/entities/userToken';

import { IUserTokensRepository } from '../IUserTokensRepository';

export class PrismaUserTokensRepository implements IUserTokensRepository {
  async findByUserId(user_id: string): Promise<UserToken[] | null> {
    const userTokens = await prisma.usersToken.findMany({
      where: {
        user_id,
      },
    });

    if (!userTokens) {
      return null;
    }

    const allUserTokens = userTokens.map((item) =>
      UserTokenMapper.toDomain(item),
    );

    return allUserTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | null> {
    const usersToken = await prisma.usersToken.findUnique({
      where: {
        refresh_token,
      },
    });

    if (!usersToken) {
      return null;
    }

    return UserTokenMapper.toDomain(usersToken);
  }

  async deleteById(id: string): Promise<void> {
    await prisma.usersToken.delete({
      where: {
        id,
      },
    });
  }

  async create(user_token: UserToken): Promise<UserToken> {
    const userToken = UserTokenMapper.toDatabase(user_token);

    await prisma.usersToken.create({
      data: userToken,
    });

    return UserTokenMapper.toDomain(userToken);
  }
}
