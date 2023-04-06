import { prisma } from '@database/lib';

import { User } from '@modules/users/entities/user';
import { IUserProps, UserMapper } from '@modules/users/mapper/user-mapper';
import { UsersRepository } from '@modules/users/repositories/users-repository';

export class PrismaUsersRepository implements UsersRepository {
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
