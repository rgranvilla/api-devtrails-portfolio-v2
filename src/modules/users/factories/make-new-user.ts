import { hash } from 'bcryptjs';

import { User } from '@modules/users/entities/user';

type Override = Partial<User>;

interface IMakeNewUserProps extends Override {
  id?: string;
}

export async function makeNewUser(override: IMakeNewUserProps = {}) {
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
