import { prisma } from '@core/database/lib';

import { IUserProps, UserMapper } from '@mappers/users/userMapper';

import { User } from '@domain/users/entities/user';

import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = (await prisma.user.findUnique({
      where: {
        id,
      },
    })) as IUserProps;

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as IUserProps;

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async save(user: User): Promise<User> {
    const raw = UserMapper.toDatabase(user);

    const createdUser = (await prisma.user.update({
      where: {
        id: user.id,
      },
      data: raw,
    })) as IUserProps;

    return UserMapper.toDomain(createdUser);
  }

  async create(user: User): Promise<User> {
    const raw = UserMapper.toDatabase(user);

    await prisma.user.create({
      data: raw,
    });

    return UserMapper.toDomain(raw);
  }
}
