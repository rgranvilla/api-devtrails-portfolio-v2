import { beforeEach, describe, expect, it } from 'vitest';

import { InvalidCredentialsError } from '@modules/users/errors/invalid-credentials-error';
import { makeNewUser } from '@modules/users/factories/make-new-user';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/in-memory-users-repository';

import { AuthenticateUseCase } from './authenticate-use-case';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    // with makeNewUser => email: 'johndoe@mail.com', password: '12345678'
    const newUser = await makeNewUser();
    await usersRepository.create(newUser);

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '12345678',
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.email).toBe('johndoe@mail.com');
  });

  it('should not be able to authenticate with wrong email', async () => {
    // with makeNewUser => email: 'johndoe@mail.com', password: '12345678'
    const newUser = await makeNewUser();
    await usersRepository.create(newUser);

    expect(async () => {
      await sut.execute({
        email: 'wrong@mail.com',
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    // with makeNewUser => email: 'johndoe@mail.com', password: '12345678'
    const newUser = await makeNewUser();
    await usersRepository.create(newUser);

    expect(async () => {
      await sut.execute({
        email: 'johndoe@mail.com',
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
