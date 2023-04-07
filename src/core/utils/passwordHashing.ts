import { hash } from 'bcryptjs';

export async function passwordHashing(password: string): Promise<string> {
  const hashedPassword = await hash(password, 6);

  return hashedPassword;
}
