import { hash } from 'bcryptjs';

export async function createHashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 6);

  return hashedPassword;
}
