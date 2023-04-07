import { hash } from 'bcryptjs';

import { User } from '@domain/users/entities/user';

type Override = Partial<User>;

interface IMakeNewUserProps extends Override {
  id?: string;
}

export async function createNewUserFactory(override: IMakeNewUserProps = {}) {
  return new User(
    {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: await hash('12345678', 6),
      ...override,
    },
    override?.id,
  );
}
