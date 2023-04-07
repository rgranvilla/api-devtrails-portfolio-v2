import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserAlreadyExistsError } from '@errors/users/userAlreadyExistsError';

import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { CreateUserUseCase } from './createUserUseCases';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create an user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345678',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should be able to hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345678',
    });

    const isPasswordCorrectlyHashed = await compare('12345678', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to create an user with email already exists', async () => {
    const email = 'johndoe@mail.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
