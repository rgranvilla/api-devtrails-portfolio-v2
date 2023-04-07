import { User } from '@domain/users/entities/user';

export abstract class IUsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract create(user: User): Promise<User>;
}
