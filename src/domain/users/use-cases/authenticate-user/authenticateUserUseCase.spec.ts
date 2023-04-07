import { beforeEach, describe, expect, it } from 'vitest';

import { InvalidCredentialsError } from '@errors/users/invalidCredentialsError';
import { createNewUserFactory } from '@factories/users/createNewUserFactory';

import { InMemoryUsersRepository } from '@repositories/users/in-memory/inMemoryUsersRepository';

import { AuthenticateUserUseCase } from './authenticateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    // with createNewUserFactory => email: 'johndoe@mail.com', password: '12345678'
    const newUser = await createNewUserFactory();
    await usersRepository.create(newUser);

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '12345678',
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.email).toBe('johndoe@mail.com');
  });

  it('should not be able to authenticate with wrong email', async () => {
    // with createNewUserFactory => email: 'johndoe@mail.com', password: '12345678'
    const newUser = await createNewUserFactory();
    await usersRepository.create(newUser);

    expect(async () => {
      await sut.execute({
        email: 'wrong@mail.com',
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    // with createNewUserFactory => email: 'johndoe@mail.com', password: '12345678'
    const newUser = await createNewUserFactory();
    await usersRepository.create(newUser);

    expect(async () => {
      await sut.execute({
        email: 'johndoe@mail.com',
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
