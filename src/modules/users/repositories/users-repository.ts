import { ICreateUserDTO } from '../dtos/create-user-dto';
import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract create(user: ICreateUserDTO): Promise<User>;
}
