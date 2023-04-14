import { IUserProps, UserMapper } from '@mappers/users/userMapper';

import { User } from '@domain/users/entities/user';

import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  public items: IUserProps[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    const parsedUser = new User(user, user.id);

    return parsedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const existingUser = this.items.find((item) => item.email === email);

    if (!existingUser) {
      return null;
    }

    const parsedUser = UserMapper.toDomain(existingUser);

    return parsedUser;
  }

  async save(user: User): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.items[userIndex] = UserMapper.toDatabase(user);
    }

    return UserMapper.toDomain(this.items[userIndex]);
  }

  async create(user: User): Promise<User> {
    this.items.push(UserMapper.toDatabase(user));

    return user;
  }
}
