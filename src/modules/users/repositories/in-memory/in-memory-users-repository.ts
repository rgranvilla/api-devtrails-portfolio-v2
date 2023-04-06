import { User } from '@modules/users/entities/user';
import { IUserProps, UserMapper } from '@modules/users/mapper/user-mapper';
import { UsersRepository } from '@modules/users/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
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
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    const parsedUser = new User(user, user.id);

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
