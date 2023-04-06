import { prisma } from '@database/lib';

import { ICreateUserTokenDTO } from '@modules/users/dtos/create-user-token-dto';
import { UserToken } from '@modules/users/entities/user-token';
import { UserTokenMapper } from '@modules/users/mapper/user-token-mapper';
import { UserTokensRepository } from '@modules/users/repositories/user-tokens-repository';

export class PrismaUserTokensRepository implements UserTokensRepository {
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

    await prisma.usersToken.create({
      data: raw,
    });

    return UserTokenMapper.toDomain(raw);
  }
}
